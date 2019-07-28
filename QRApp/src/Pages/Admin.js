import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  LayoutAnimation,
  UIManager,
  Picker
} from 'react-native';
import Modal from 'react-native-modal';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/authActions';
import { Button, Text, Icon } from 'react-native-elements';
import ModalSelector from 'react-native-modal-selector';

type Props = {};
class Admin extends Component<Props> {

  constructor(props) {
    super(props);
    this.TopEnum = { None: 0, Repeat: 1, Server: 2 };
    this.visibleEvent = this.visibleEvent.bind(this);
    this.visibleAttribute = this.visibleAttribute.bind(this);
    this.clickEvent = this.clickEvent.bind(this);

    var index = 0;
    this.events = [
      { key: index++, label: 'Check In' },
      { key: index++, label: 'Workshop' },
      { key: index++, label: 'Breakfast' },
      { key: index++, label: 'Lunch' },
      { key: index++, label: 'Dinner' },
      { key: index++, label: 'Midnight Snack' }
    ];

    index = 0;

    this.attributes = [
      { key: index++, label: 'Vegan' },
      { key: index++, label: 'Vegetarian' },
      { key: index++, label: 'Halal' },
      { key: index++, label: 'Kosher' },
      { key: index++, label: 'Food Allergies' },
      { key: index++, label: 'None' }
    ];
  }


  state = {
    Hello: 'Hello',
    selection: 'None',
    selectionTwo: 'None',
    eventName: 'Check In',
    attribute: 'None',
    eventVisible: false,
    attributeVisible: false,
    modalVisible: false,
    checkIn: false,
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
     return (
       <View style={styles.container}>
        <Text
          style={styles.floatTextTop}
          onPress={() => this.props.logout()}
        >
          LOG OUT
        </Text>

        <Text h3 style={{ marginTop: '40%' }}>Scanner Home</Text>
        <ModalSelector
          data={this.events}
          initValue="Check In"
          onChange={(itemValue) => this.setState({ eventName: itemValue.label })}
          style={{ marginTop: 10 }}
          animationType='fade'
        />

        {
          this.state.eventName !== 'Check In' &&
          this.state.eventName !== 'Workshop' &&
          <ModalSelector
            data={this.attributes}
            initValue="Select something yummy!"
            onChange={(itemValue) => this.setState({ attribute: itemValue.label })}
            style={{ marginTop: 15 }}
            animationType='fade'
          />
        }

        <Button
          containerStyle={{ marginTop: 15 }}
          buttonStyle={{ backgroundColor: '#C8C8C8', borderColor: '#C8C8C8' }}
          titleStyle={{ color: 'black', fontSize: 18 }}
          title="New Scan"
          type="outline"
          onPress={() => Actions.replace('qrscan',
          { eventName: this.state.eventName,
            attribute: this.state.attribute })}
        />

        <Button
          containerStyle={styles.floatButtonBottom}
          buttonStyle={{ borderColor: '#C8C8C8', borderWidth: 4 }}
          titleStyle={{ color: 'black', fontSize: 18 }}
          title="Instructions"
          type="outline"
          onPress={() => this.setState({ modalVisible: true })}
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
    container: {
        display: 'flex',
        marginLeft: 15,
        marginRight: 15,
        height: '100%'
    },
    selectInput: {
        borderWidth: 4,
        borderColor: 'black',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 15,
        height: 50,
        width: '100%'
    },
    floatButtonBottom: {
        display: 'flex',
        position: 'absolute',
        bottom: 40,
        margin: 10,
        width: '75%',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    floatTextTop: {
        position: 'absolute',
        top: 0,
        margin: 10,
        right: 0,
        left: 0,
        textAlign: 'center',
        fontSize: 16
    },
    instructionContainer: {
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: '5%',
      paddingRight: '5%',
      paddingTop: 50,
      height: '60%',
      backgroundColor: 'white'
    },
});

// const styles = StyleSheet.create({
//  centerContainer: {
//     display: 'flex',
//     height: '100%',
//  },
//  navbarContainer: {
//    display: 'flex',
//    flexDirection: 'row',
//    width: '100%',
//    height: '10%',
//    justifyContent: 'space-between'
//  },
//  navbarTab: {
//    display: 'flex',
//    marginTop: 30,
//    justifyContent: 'center',
//    alignSelf: 'center',
//    alignItems: 'center',
//  },
//  selectionText: {
//    color: 'red',
//    fontSize: 30
//  },
//  picker: {
//    display: 'flex',
//    width: '50%',
//    backgroundColor: 'white',
//    alignItems: 'center',
//    justifyContent: 'center'
//  },
//  pickerContainer: {
//    display: 'flex',
//    flexDirection: 'row',
//    textAlign: 'center',
//    justifyContent: 'space-around',
//    marginTop: 20
//  },
//  choiceContainer: {
//    display: 'flex',
//    flexDirection: 'column',
//    textAlign: 'center'
//  }
// });

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
