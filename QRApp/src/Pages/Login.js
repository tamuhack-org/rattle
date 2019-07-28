import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/authActions';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  login() {
    console.log(this.props);
    this.props.login(this.state.email, this.state.password).then(() => {
      if (this.props.error) {
        Alert.alert('Login Failed. Try again!');
      } else {
        console.log(this.props);
        Actions.replace('admin');
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
          <Text h3>Scanner Login</Text>
          <TextInput
              style={styles.textInput}
              placeholder="Username"
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
          />
          <TextInput
              secureTextEntry
              style={styles.textInput}
              placeholder="Password"
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
          />
          <Button
              containerStyle={{ marginTop: 15 }}
              buttonStyle={{ backgroundColor: '#C8C8C8', borderColor: '#C8C8C8' }}
              titleStyle={{ color: 'black', fontSize: 18 }}
              title="Login"
              type="outline"
              onPress={() => this.login()}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: '20%',
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
  login: (email, password) => dispatch(actions.login({ email, password }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
