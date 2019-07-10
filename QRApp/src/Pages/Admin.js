import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  LayoutAnimation,
  UIManager
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import { Button, Overlay } from 'react-native-elements';

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

type Props = {};
class Admin extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = { Hello: 'Hello',
    selection: 'None',
    selectionTwo: 'None',
    eventName: 'Lunch',
    attribute: 'Chicken',
    eventVisible: false,
    attributeVisible: false };
    this.TopEnum = { None: 0, Repeat: 1, Server: 2 };
    this.visibleEvent = this.visibleEvent.bind(this);
    this.visibleAttribute = this.visibleAttribute.bind(this);
    this.clickEvent = this.clickEvent.bind(this);
  }

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
           <View style={styles.navbarContainer}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Button title="Admin" containerStyle={styles.navbarTab} />
              <Button title="Scanner" containerStyle={styles.navbarTab} onPress={() => Actions['qrscan'].call()} />
            </View>
            <Button title="Logout" containerStyle={styles.navbarTab} />
           </View>
           <View style={styles.pickerContainer}>
             <View style={styles.choiceContainer}>
               <Text h1 style={{ textAlign: 'center', fontSize: 20 }}> Event </Text>
               <Button
                 type="outline"
                 title={eventName}
                 containerStyle={{ marginTop: 20 }}
                 onPress={() => this.visibleEvent()}
               />
             </View>
             <View style={styles.choiceContainer}>
              <Text h1 style={{ textAlign: 'center', fontSize: 20 }}> Attribute </Text>
               <Button
                 type="outline"
                 title={attribute}
                 containerStyle={{ marginTop: 20 }}
                 onPress={() => this.visibleAttribute()}
               />
             </View>
           </View>
         <Overlay
            isVisible={this.state.eventVisible}
            onBackdropPress={() => {
              this.setState({ eventVisible: false });
            }}
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
         >
            <View>
              <Button
                title="Breakfast"
                containerStyle={{ marginTop: 40 }}
                onPress={() => this.clickEvent('Breakfast')}
              />
              <Button
                title="Lunch"
                containerStyle={{ marginTop: 40 }}
                onPress={() => this.clickEvent('Lunch')}
              />
              <Button
                title="Dinner"
                containerStyle={{ marginTop: 40 }}
                onPress={() => this.clickEvent('Dinner')}
              />
            </View>
          </Overlay>
          <Overlay
            isVisible={this.state.attributeVisible}
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            onBackdropPress={() => this.setState({ attributeVisible: false })}
          >
            <View>
              <Button
                title="Chicken"
                containerStyle={{ marginTop: 40 }}
                onPress={() => this.setState({ attribute: 'Chicken', attributeVisible: false })}
              />
              <Button
                title="Fish"
                containerStyle={{ marginTop: 40 }}
                onPress={() => this.setState({ attribute: 'Fish', attributeVisible: false })}
              />
              <Button
                title="Beef"
                containerStyle={{ marginTop: 40 }}
                onPress={() => this.setState({ attribute: 'Beef', attributeVisible: false })}
              />
            </View>
          </Overlay>

          <View style={styles.instructionContainer}>
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

         </View>
       );
    }
}

const styles = StyleSheet.create({
 centerContainer: {
    display: 'flex',
    height: '100%'
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
   width: 80,
   justifyContent: 'center',
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
   width: '90%',
   height: '100%',
   marginLeft: '5%',
   marginRight: '10%',
   marginTop: 50
 }
});

export default Admin;
