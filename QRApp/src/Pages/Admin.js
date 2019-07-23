import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  LayoutAnimation,
  UIManager,
  Picker
} from 'react-native';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/authActions';
import { Button, Overlay, Icon } from 'react-native-elements';

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

type Props = {};
class Admin extends Component<Props> {

  constructor(props) {
    super(props);
    this.TopEnum = { None: 0, Repeat: 1, Server: 2 };
    this.visibleEvent = this.visibleEvent.bind(this);
    this.visibleAttribute = this.visibleAttribute.bind(this);
    this.clickEvent = this.clickEvent.bind(this);
  }

  state = {
    Hello: 'Hello',
    selection: 'None',
    selectionTwo: 'None',
    eventName: 'Check In',
    attribute: 'Chicken',
    eventVisible: false,
    attributeVisible: false,
    modalVisible: false,
    checkIn: false,
    events: ['Check In', 'Workshop', 'Breakfast', 'Lunch', 'Dinner', 'Midnight Snack'],
    attributes: ['Vegan', 'Vegetarian', 'Halal', 'Kosher', 'Food Allergies', 'None']
  };

  visibleEvent() {
    LayoutAnimation.linear();
    this.setState({ eventVisible: true });
  }

  visibleAttribute() {
    LayoutAnimation.linear();
    this.setState({ attributeVisible: true });
  }

  clickEvent(evt) {
    LayoutAnimation.easeInEaseOut();
    this.setState({ eventVisible: false, eventName: evt });
  }

   render() {
     const eventName = this.state.eventName;
     const attribute = this.state.attribute;
     return (
       <View style={styles.centerContainer}>
        <Button title="Logout"
        containerStyle={styles.navbarTab} onPress={() => this.props.logout()}
        buttonStyle={{ display: 'flex', justifyContent: 'center', alignSelf: 'center' }}
        />
        <Text h1 style={{ textAlign: 'center', fontSize: 40, marginTop: 40 }}> Scanning Home </Text>
        <Button
          title="Instructions"
          onPress={() => this.setState({ modalVisible: true })}
          containerStyle={{ position: 'absolute', bottom: 50, alignSelf: 'center', justifyContent: 'flex-end', width: '60%' }}
          buttonStyle={{ padding: 10 }}
          titleStyle={{ fontSize: 20 }}
        />
        <Picker
          selectedValue={this.state.eventName}
          onValueChange={(itemValue) => this.setState({ eventName: itemValue })}>
          {
          this.state.events.map((v, index) => {
           return <Picker.Item label={v} value={v} key={index} />
          })
          }
        </Picker>

        {
          this.state.eventName !== 'Check In' &&
          this.state.eventName !== 'Workshop' &&
          <Picker
            selectedValue={this.state.attribute}
            onValueChange={(itemValue) => this.setState({ attribute: itemValue })}>
            {
            this.state.attributes.map((v, index) => {
             return <Picker.Item label={v} value={v} key={index} />
            })
            }
          </Picker>
        }

        <Button
        title="Scanner"
        containerStyle={{ marginTop: 50, justifyContent: 'center', alignSelf: 'center' }}
        onPress={() => Actions.replace('qrscan',
        { eventName: this.state.eventName,
          attribute: this.state.attribute })}
        />

        <Modal
          style={{ margin: 0, justifyContent: 'flex-end', height: 400 }}
          isVisible={this.state.modalVisible}
          animationIn='slideInUp'
          animationInTiming={500}
          animationOut='slideOutDown'
          animationOutTiming={500}
        >
          <View style={styles.instructionContainer}>
            <Icon
              name='times'
              type='font-awesome'
              color='#f50'
              containerStyle={{ position: 'absolute', right: 20, top: 20 }}
              iconStyle={{ color: 'black' }}
              hitSlop={{ top: 40, bottom: 40, left: 40, right: 40 }}
              onPress={() => this.setState({ modalVisible: false })}
            />
            <Text style={{ fontWeight: 'bold', width: '100%', fontSize: 17, marginBottom: 20 }}>
              Instructions
            </Text>
            <Text style={{ width: '100%', fontSize: 17, marginBottom: 20 }}>
              <Text style={{ fontWeight: 'bold' }}> 1. </Text>
              Make sure the two options above are correctly set.
              (Double check, this is crucial)
            </Text>
            <Text style={{ width: '100%', fontSize: 17, marginBottom: 20 }}>
              <Text style={{ fontWeight: 'bold' }}> 2. </Text>
              Go to Scanner tab and scan the QR code.
            </Text>
            <Text style={{ width: '100%', fontSize: 17, marginBottom: 20 }}>
              <Text style={{ fontWeight: 'bold' }}> 3. </Text>
              Verify the confirmation page. If you see any
              warning use your discretion to resolve them.
            </Text>
            <Text style={{ width: '100%', fontSize: 17, marginBottom: 20, textAlign: 'center', color: '#C0C0C0' }}>
              Things to look out for:
            </Text>
            <Text style={{ width: '100%', fontSize: 17, marginBottom: 20 }}>
              <Text style={{ fontWeight: 'bold' }}> Repeat Entry - </Text>
              If the hacker has already been marked for the event
              being scanned for.
            </Text>
            <Text style={{ width: '100%', fontSize: 17, marginBottom: 20 }}>
              <Text style={{ fontWeight: 'bold' }}> Server Errors - </Text>
              Any error will be rendered on the page.
              This should only arise during QA testing.
            </Text>
          </View>
        </Modal>
       </View>
     );
  }
}

const styles = StyleSheet.create({
 centerContainer: {
    display: 'flex',
    height: '100%',
 },
 navbarContainer: {
   display: 'flex',
   flexDirection: 'row',
   width: '100%',
   height: '10%',
   justifyContent: 'space-between'
 },
 navbarTab: {
   display: 'flex',
   marginTop: 30,
   justifyContent: 'center',
   alignSelf: 'center',
   alignItems: 'center',
 },
 selectionText: {
   color: 'red',
   fontSize: 30
 },
 picker: {
   display: 'flex',
   width: '50%',
   backgroundColor: 'white',
   alignItems: 'center',
   justifyContent: 'center'
 },
 pickerContainer: {
   display: 'flex',
   flexDirection: 'row',
   textAlign: 'center',
   justifyContent: 'space-around',
   marginTop: 20
 },
 choiceContainer: {
   display: 'flex',
   flexDirection: 'column',
   textAlign: 'center'
 },
 instructionContainer: {
   display: 'flex',
   flexDirection: 'column',
   paddingLeft: '5%',
   paddingRight: '5%',
   paddingTop: 50,
   height: '60%',
   backgroundColor: 'white'
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
