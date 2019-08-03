 import React, { Component } from 'react';
 import {
   View,
   StyleSheet,
   Text,
   Dimensions,
   Alert,
   TextInput,
   ScrollView,
   FlatList
 } from 'react-native';
 import Toast from 'react-native-easy-toast';
 import { Button, Badge, Icon, ListItem } from 'react-native-elements';
 import QRCodeScanner from 'react-native-qrcode-scanner';
 import Modal from 'react-native-modal';
 import axios from 'axios';
 import { Actions } from 'react-native-router-flux';
 import { connect } from 'react-redux';
 import * as actions from '../../redux/actions/authActions';

type Props = {};
class QRScan extends Component<Props> {

  constructor(props) {
    super(props);
    this.checkInUrl = 'https://register.tamuhack.com/volunteer/checkin';
    this.checkInStatusUrl = 'https://register.tamuhack.com/volunteer/checkin?email=';
    this.foodUrl = 'https://register.tamuhack.com/volunteer/food';
    this.workshopUrl = 'https://register.tamuhack.com/volunteer/workshops';
    this.manualUrl = 'https://register.tamuhack.com/volunteer/search?q=';
    this.foodOptions = ['Vegan', 'Vegetarian', 'Halal', 'Kosher', 'Food Allergies', 'None'];
    this.eventName = Object.prototype.hasOwnProperty.call(props, 'eventName') ? this.props.eventName : '';
    this.attribute = Object.prototype.hasOwnProperty.call(props, 'attribute') ? this.props.attribute : '';

    if (this.eventName === 'Check In') {
      this.eventType = 'checkin';
    } else if (this.eventName === 'Workshop') {
      this.eventType = 'workshop';
    } else {
      for (var i = 0; i < this.foodOptions.length; i++) {
        console.log(this.foodOptions[i]);
        if (this.foodOptions[i] === this.attribute) {
          console.log('Food!');
          this.eventType = 'food';
          break;
        }
      }
    }

    this.authToken = Object.prototype.hasOwnProperty.call(props, 'userData') ? this.props.userData.data.token : '';

    console.log(this.eventName);
    console.log(this.eventType);
    console.log(this.attribute);
    console.log(this.authToken);
  }

  state = {
    modalVisible: false,
    requestBody: {},
    firstName: 'None',
    lastName: 'None',
    email: 'None',
    boolCheckedIn: false,
    searchManual: false,
    list: []
  }

  async onQRRead(scan) {
    console.log(scan);
    let jsonData = '';

    if (this.authToken === '') {
      // Alert user to relog!
      Alert.alert(
          'QR Scanning Error',
          'No authentication token! Please relog!',
          [
            { text: 'OK', onPress: () => this.scanner.reactivate() },
          ],
          { cancelable: false }
        );
      console.log('No Auth Token!');

      return;
    }

    try {
      jsonData = JSON.parse(scan.data);
    } catch (exception) {
      // Alert user
      Alert.alert(
          'QR Scanning Error',
          'Invalid QR Code. Json parsing failed',
          [
            { text: 'OK', onPress: () => this.scanner.reactivate() },
          ],
          { cancelable: false }
        );
      return;
    }

    const bodyObj = {};

    if (!Object.prototype.hasOwnProperty.call(jsonData, 'email')) {
      // Alert user

      Alert.alert(
          'QR Scanning Error',
          'No email key in json! Invalid QR Code',
          [
            { text: 'OK', onPress: () => this.scanner.reactivate() },
          ],
          { cancelable: false }
        );
      return;
    }

    bodyObj.email = jsonData.email;
    bodyObj.eventRequest = this.eventType;

    if (this.eventType === 'food') {
      console.log('Food');
      if (this.eventName === '' || this.attribute === '') {
        console.log('Either the Event name or the attribute was not correctly filled out! Try again!');
        this.scanner.reactivate();
        return;
      }

      bodyObj.meal = this.props.eventName;
      bodyObj.restrictions = this.props.attribute;
      bodyObj.eventRequest = 'food';
    }

    if (this.eventName === 'Check In') {
      bodyObj.eventRequest = 'checkin';
    }

    if (this.eventName === 'Workshop') {
      bodyObj.eventRequest = 'workshop';
    }
    var checkedIn = false;

    await axios.get(
        this.checkInStatusUrl + '' + bodyObj.email,
        {
           headers: {
             'content-type': 'application/json',
             authorization: 'Token ' + this.authToken
           }
        }
      ).then(response => {
        if (response.data.checked_in) {
          checkedIn = true;
        }
        console.log(response);
      }).catch(error => {
        Alert.alert(
            'API Request Error',
            'API request failed!',
            [
              { text: 'OK', onPress: () => this.scanner.reactivate() },
            ],
            { cancelable: false }
          );
        return;
      });

    console.log(bodyObj);
    this.setState({
      requestBody: bodyObj,
      boolCheckedIn: checkedIn,
      email: jsonData.email,
      firstName: jsonData.first_name,
      lastName: jsonData.last_name }, () => {
      this.setModalVisible(true);
    });
  }

  setModalVisible(visible) {
    if (visible === false && !this.state.searchManual) {
      this.scanner.reactivate();
    }

    this.setState({ modalVisible: visible });
  }

  setManualVisible(visible) {
    this.setState({ searchManual: visible });
  }

  sendRequest() {
    const authToken = 'Token ' + this.authToken;
    console.log(this.state.requestBody.eventRequest);
    switch (this.state.requestBody.eventRequest) {
      case 'checkin':
        this.reqUrl = this.checkInUrl;
        break;
      case 'food':
        this.reqUrl = this.foodUrl;
        break;
      case 'workshop':
        this.reqUrl = this.workshopUrl;
        break;
      default:
        this.reqUrl = '';
    }

    console.log(this.reqUrl);
    if (this.reqUrl === '') {
      console.log("Endpoint isn't valid! Try again!");
      return;
    }

    axios.post(
        this.reqUrl,
        this.state.requestBody,
        {
           headers: {
             'content-type': 'application/json',
             authorization: authToken
           }
        }
      ).then(response => {
        console.log('Success');
        console.log(response);
        if (this.state.requestBody.eventRequest === 'checkin') {
          this.setState({ boolCheckedIn: true }, () => {
            this.setModalVisible(false);
          });
        }
        this.refs.toast.show('Success');
      }).catch(error => {
        if (error.response.status === 412) {
          Alert.alert('Person has not checked in! Please contact a director.');
        } else {
          Alert.alert('Unknown error!');
        }
        console.log(error.response);
      });

      this.setModalVisible(false);
  }

  manualGet(username) {
    if (username === '') {
      return;
    }
    const authToken = 'Token ' + this.authToken;
    const searchUrl = this.manualUrl + username;

    axios.get(
      searchUrl,
      {
        headers: {
          'content-type': 'application/json',
          authorization: authToken
        }
      }
    ).then(response => {
      this.setState({ list: response.data.results });
    }).catch(error => {
      Alert.alert('Error occured with manual search!');
    });
  }

  async sendManualRequest(listItem) {
    const bodyObj = {};

    bodyObj.email = listItem.email;
    bodyObj.eventRequest = this.eventType;

    if (this.eventType === 'food') {
      console.log('Food');
      if (this.eventName === '' || this.attribute === '') {
        console.log('Either the Event name or the attribute was not correctly filled out! Try again!');
        return;
      }

      bodyObj.meal = this.props.eventName;
      bodyObj.restrictions = this.props.attribute;
      bodyObj.eventRequest = 'food';
    }

    if (this.eventName === 'Check In') {
      bodyObj.eventRequest = 'checkin';
    }

    if (this.eventName === 'Workshop') {
      bodyObj.eventRequest = 'workshop';
    }

    let checkedIn = false;

    await axios.get(
        this.checkInStatusUrl + '' + bodyObj.email,
        {
           headers: {
             'content-type': 'application/json',
             authorization: 'Token ' + this.authToken
           }
        }
      ).then(response => {
        if (response.data.checked_in) {
          checkedIn = true;
        }
        console.log(response);
      }).catch(error => {
        Alert.alert(
            'API Request Error',
            'API request failed!',
            [
              { text: 'OK', onPress: () => this.scanner.reactivate() },
            ],
            { cancelable: false }
          );
        return;
      });

    console.log(bodyObj);
    this.setState({
      requestBody: bodyObj,
      boolCheckedIn: checkedIn,
      email: listItem.email,
      firstName: listItem.first_name,
      lastName: listItem.last_name }, () => {
      this.setModalVisible(true);
    });
  }

  renderModalContent = () => (
    <View style={styles.modalContainer}>
      <Icon
        name='times'
        type='font-awesome'
        color='#f50'
        containerStyle={{ position: 'absolute', right: 20, top: 20 }}
        iconStyle={{ color: 'black' }}
        hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}
        onPress={() => this.setModalVisible(false)}
      />
      <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
        <Badge
           containerStyle={{ marginRight: 10 }}
           textStyle={{ fontSize: 15, color: 'black' }}
           badgeStyle={{ padding: 18, backgroundColor: '#FFD9D9' }}
           value={this.eventName}
        />
        {this.eventType !== 'checkin' &&
         this.eventType !== 'workshop' &&
         this.eventType !== '' &&
          <Badge
             textStyle={{ fontSize: 15, color: 'black' }}
             badgeStyle={{ padding: 18, backgroundColor: '#D9EFFF' }}
             value={this.attribute}
          />
        }
      </View>
      <View style={styles.textRow}>
        <Text style={{ fontSize: 28, fontWeight: 'bold' }}>{this.state.firstName} {this.state.lastName}</Text>
      </View>
      <View
      style={[styles.checkInStatusRow,
        { borderColor: this.state.boolCheckedIn ? '#5CD059' : '#FFBFBF' }]}
      >
        <Text style={{ fontSize: 25 }}>{this.state.boolCheckedIn ? 'Checked In' : 'Not Checked In'}</Text>
      </View>
      <View style={styles.emailRow}>
        <Text style={{ fontSize: 16, fontWeight: 'bold' }} >Emails</Text>
        <Text style={{ fontSize: 16 }} >{this.state.email}</Text>
      </View>
      <Button
      onPress={() => this.sendRequest()}
      disabled={this.state.boolCheckedIn && this.state.requestBody.eventRequest === 'checkin'}
      buttonStyle={{ display: 'flex', flex: 1, padding: 25, height: 150, justifyContent: 'center', alignItems: 'center' }}
      title={this.state.requestBody.eventRequest === 'checkin' ? 'Check In' : 'Event Check In'}
      />
    </View>
  );

  render() {
    const manual = this.state.searchManual;
    const list = this.state.list;
    console.log('Checked In ' + this.state.boolCheckedIn);
    return (
      <View style={{ display: 'flex', height: '100%' }}>
        <View style={styles.topContent}>
          <Button
          onPress={() => Actions.replace('admin')}
          containerStyle={{ display: 'flex', width: '70%' }} title="Back to Scanning Selection"
          buttonStyle={{ backgroundColor: '#C8C8C8', borderColor: '#C8C8C8' }}
          type='outline'
          titleStyle={{ color: 'black', fontSize: 18 }}
          />
          <Button
          containerStyle={{ display: 'flex', width: '70%', marginTop: 10 }}
          type='outline'
          buttonStyle={{ borderColor: '#C8C8C8', borderWidth: 4 }}
          titleStyle={{ color: 'black', fontSize: 18 }}
          title={!manual ? 'Search Manually' : 'Scan QR'}
          onPress={() => this.setManualVisible(!manual)}
          />
        </View>
        {
          !this.state.searchManual &&
          <React.Fragment>
            <QRCodeScanner
              ref={(node) => { this.scanner = node; }}
              onRead={this.onQRRead.bind(this)}
              cameraType='back'
              cameraStyle={{ height: Dimensions.get('window').height }}
              topViewStyle={{ height: 0, flex: 0 }}
              bottomViewStyle={{ height: 0, flex: 0 }}
            />
          </React.Fragment>
        }

        {
          this.state.searchManual &&
          <View style={{ marginLeft: 15, marginRight: 15 }}>
            <TextInput
                  style={styles.textInput}
                  placeholder="Search User by Name"
                  onChangeText={(manualUsername) => this.setState({ manualUsername })}
                  value={this.state.manualUsername}
            />
            <Button
                containerStyle={{ marginTop: 15, marginBottom: 30 }}
                buttonStyle={{ backgroundColor: '#C8C8C8', borderColor: '#C8C8C8' }}
                titleStyle={{ color: 'black', fontSize: 18 }}
                title="Search User"
                type="outline"
                onPress={() => this.manualGet(this.state.manualUsername)}
            />
            <View style={{ display: 'flex', height: '70%', bottom: 20 }}>
              <ScrollView>
                {
                    list.map((l, i) => (
                        <ListItem
                            key={i}
                            rightIcon={{ name: 'add' }}
                            title={l.first_name + ' ' + l.last_name + '\n' + l.email}
                            titleStyle={{ width: '85%' }}
                            onPress={() => this.sendManualRequest(l)}
                        />
                    ))
                }
              </ScrollView>
            </View>
          </View>
        }

        <Modal
          style={{ margin: 0, justifyContent: 'flex-end' }}
          isVisible={this.state.modalVisible}
          animationIn='slideInUp'
          animationInTiming={500}
          animationOut='slideOutDown'
          animationOutTiming={500}
        >
          {this.renderModalContent()}
        </Modal>
        <Toast
        ref="toast"
        defaultCloseDelay={3000}
        style={{ display: 'flex', width: 200, height: 50, backgroundColor:'#5CD059', justifyContent: 'center', alignItems: 'center' }}
        textStyle={{ fontSize: 20 }}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  topContent: {
    display: 'flex',
    flexDirection: 'column',
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 30,
    marginBottom: 30,
    padding: 0
  },
  modalContainer: {
    display: 'flex',
    backgroundColor: 'white',
    height: 350,
    padding: 30,
  },
  textRow: {
    marginBottom: 8
  },
  checkInStatusRow: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 30
  },
  emailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 7,
    borderBottomWidth: 1,
    borderColor: '#DEDEDE',
    marginBottom: 35
  },
  container: {
    marginLeft: 15,
    marginRight: 15
  },
  textInput: {
      borderWidth: 2,
      borderColor: 'black',
      paddingLeft: 10,
      marginTop: 15,
      height: 40
  }
});

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isLoading: state.auth.isLoading,
  userData: state.auth.userData,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(actions.login({ email, password })),
  logout: () => dispatch(actions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(QRScan);
