import React from 'react';
import QrReader from 'react-qr-reader';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/authActions';
import { LoginData } from '../../types/TypeObjects';
import { Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {generateToast} from './../../Components/toast';
import Toast from './../../Components/toast';

interface IProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  userData: LoginData;
  error: string;
  login: (email: string, password: string) => Promise<object>;
}

interface IState {
  email: string;
  password: string;
  submitColor: string;
  redirectToSelection: boolean;

  // Added state for the toast
  loginFailed: boolean;
  loginSuccess: boolean;
  currentToastID: number;
  toastText: string;
}

class Login extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.emailHandler = this.emailHandler.bind(this);
    this.passwordHandler = this.passwordHandler.bind(this);
    this.state = {
      email: "", 
      password: "", 
      submitColor: '#FF7C93', 
      redirectToSelection: false, 
      loginFailed: false, 
      loginSuccess: false,
      currentToastID: 0, 
      toastText: ""
    };
  }

  createFailureToast() {
    // Create a new toast by toggling the state
    this.setState({
      loginFailed: true,
      loginSuccess: false,
      toastText: "Failed to login!",
      // Toasts need a unique ID to know when to render
      currentToastID: this.state.currentToastID + 1
    })
  }

  createSuccessToast() {
    // Create a new toast by toggling the state
    this.setState({
      loginSuccess: true,
      loginFailed: false,
      toastText: "Login successfuly!",
      // Toasts need a unique ID to know when to render
      currentToastID: this.state.currentToastID + 1
    })
  }

  login() {
    this.props.login(this.state.email, this.state.password).then(() => {
      if(this.props.error) {
        this.createFailureToast()
        console.log(this.props);
      } else {
        this.createSuccessToast()
      }
    });
  }

  emailHandler = (event) => {
    this.setState({ email: event.target.value });
  }

  passwordHandler = (event) => {
    this.setState({ password: event.target.value });
  }

  render() {
    const { redirectToSelection } = this.state;

    if(redirectToSelection) {
      return (
        <Redirect to='/select'/>
      )
    }
 
    // Create the success and failure toast
    let failureToast = (this.state.loginFailed) ? (
      <Toast type="error" text={this.state.toastText} id={this.state.currentToastID}/>
    ) : undefined;

    let successToast = (this.state.loginSuccess) ? (
      // Note, the call back will reload page and cause the page to redirect once toast is finished. 
      <Toast type="success" text={this.state.toastText} id={this.state.currentToastID} callback={() => this.setState({ redirectToSelection: true })}/>
    ) : undefined;

    return (
      <div style={style.pageContainer}>
        <form style={style.formContainer}>
          <div style={style.titleContainer}>
            <img
              style={style.logoContainer}
              src={require("../../assets/hiss.svg")}
            />
            <p style={{ fontSize: '18px' }}>by tamuhack</p>
          </div>
          <input
            type='text'
            placeholder='Email'
            value={this.state.email}
            onChange={this.emailHandler}
            style={style.inputContainer}
          />
          <input
            type='password'
            placeholder='Password'
            value={this.state.password}
            onChange={this.passwordHandler}
            style={style.inputContainer}
          />

          <Button
            onClick={() => this.login()}
            style={{...style.submitContainer, backgroundColor: this.state.submitColor}}
          >
            Login
          </Button>

          {/* Render Toast (This can go anywhere inside the render. It doesn't have to be at bottom) */}
          {failureToast}
          {successToast}

        </form>
      </div>
    );
  }
}

const style : { [key: string]: React.CSSProperties } = {
  logoContainer : {
    display: 'flex',
    marginLeft: '-10px',
    height: '56px'
  },
  pageContainer : {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: '27vh',
    marginBottom: '40px',
    width: '80vw'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw',
    paddingLeft: '10vw',
    paddingRight: '10vw',
    height: '100vh',
  },
  inputContainer: {
    height: '57px',
    width: '80vw',
    paddingLeft: '4%',
    marginBottom: '3vh',
    fontSize: 17
  },
  submitContainer: {
    height: '57px',
    width: '80vw',
    marginTop: '3vh',
    color: 'white',
    fontSize: 20
  },
};

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isLoading: state.auth.isLoading,
  userData: state.auth.userData,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  login: (email:string, password:string) => dispatch(actions.login(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
