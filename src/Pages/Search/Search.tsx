import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import axios from 'axios';
import Toast from './../../Components/toast';
import TopNavbar from './../../Components/navbar';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { QRData, LoginData } from '../../types/TypeObjects';
import { Redirect } from 'react-router-dom';

interface IProps {
  event: string;
  token: number
  attribute: string;
  userData: LoginData;
}

interface IState {
    event: string;
    attribute: string;

    name: string;
    displayUsers: boolean;
    users: Array<any>;

    // Added state for the toast
    searchFailed: boolean;
    searchSuccess: boolean;
    currentToastID: number;
    toastText: string;

    modalVisible: boolean;
    participantData: QRData;

    redirectToLogin: boolean;
}

class Selection extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
        event: "",
        attribute: "",
        name: "",

        displayUsers: false,
        users: [],
        searchFailed: false, 
        searchSuccess: false,
        currentToastID: 0, 
        toastText: "",

        modalVisible: false,
        participantData: {
          "email": "",
          "first_name": "",
          "last_name": ""
        },

        redirectToLogin: this.props.userData === undefined
    }
  }

  showModal = () => {
    this.setState({ modalVisible: true });
  }

  closeModal = () => {
    this.setState({ modalVisible: false });
  }
  
  setParticipantData = (user) => {
    this.setState({ participantData: user}, () => {
      this.setState({ modalVisible: true });
    });
  }

  nameHandler = (event) => {
    this.setState({ name: event.target.value });
  }

  createFailureToast() {
    // Create a new toast by toggling the state
    this.setState({
      searchFailed: true,
      searchSuccess: false,
      toastText: "Failed to authenticate!",
      // Toasts need a unique ID to know when to render
      currentToastID: this.state.currentToastID + 1
    })
  }

  createSuccessToast(responseData) {
    // Create a new toast by toggling the state
    this.setState({
      searchSuccess: true,
      searchFailed: false,
      users: responseData,
      toastText: `Found ${responseData.length} user${responseData.length - 1 ? '': 's'}!`,
      // Toasts need a unique ID to know when to render
      currentToastID: this.state.currentToastID + 1
    })
  }

  createWarningToast(responseData) {
    // Create a new toast by toggling the state
    this.setState({
      toastText: "No users found!",
      searchSuccess: true,
      searchFailed: false,
      users: responseData,
      // Toasts need a unique ID to know when to render
      currentToastID: this.state.currentToastID + 1
    })
  }

  // TODO
  handlePopup = (user) => {
    console.log(user)
  }

  // Calls the api/volunteer/search endpoint
  // NOTE: There is no hard cap or limit checking. A person can type " " and get every user for instance
  handleSearchSubmit = () => {
    var {
      name,
      event,
      attribute
    } = this.state

    // Token taken from Redux State
    // This will get reset each server restart. This means you will have to visit the login page again.
    var token = this.props.userData.data.token;

    if(name && token) {
      return axios.get(
        `https://register.tamuhack.com/api/volunteer/search?q=${name}`,
        {
          headers: {
            'Authorization': `Token ${token}`
          }
        }
      ).then(response => {
        var responseData = response.data.results
        
        // OPTIONAL: Warning toast if there is 0 results found
        responseData.length == 0 ? this.createWarningToast(responseData) : this.createSuccessToast(responseData) 
      }).catch(error => {
        this.createFailureToast() 
      });
    } else {
      // Same error message as in the .catch tag
      this.createFailureToast() 
    }
  }

  render() {
    var {
        name,
        users,
        redirectToLogin
    } = this.state;

    if(redirectToLogin) {
      return <Redirect to='/' />
    }

    // Create the failure, success, and warning toast
    let failureToast = (this.state.searchFailed) ? (
        <Toast type="error" text={this.state.toastText} id={this.state.currentToastID}/>
    ) : undefined;
  
    let successToast = (this.state.searchSuccess && users.length != 0) ? (
        <Toast type="success" text={this.state.toastText} id={this.state.currentToastID}/>
    ) : undefined;
  
    let warningToast = (this.state.searchSuccess && users.length == 0) ? (
        <Toast type="warning" text={this.state.toastText} id={this.state.currentToastID}/>
    ) : undefined;

    return (
      <div>
        <TopNavbar leftIconSrc="arrowleft" leftRedirectRoute="/scan"/>
        <div style={style.pageContainer}>
          <InputGroup className="mb-3">
              <FormControl
                  style={{fontSize: "18px"}}
                  placeholder="Search User"
                  onChange={this.nameHandler}
              />
          </InputGroup>

          <Button block
            style={{border: "1px solid #FF7C93", backgroundColor: "#FF7C93"}}
            onClick={this.handleSearchSubmit}
            disabled={! (name)}
            size="lg"
          > Search </Button>
          <div style={{marginTop: "10px"}}>
              {
                // For each user 
                users.map((user, index) => {
                    // Return this HTML 
                    return (
                        <div onClick={() => this.setParticipantData(user)} style={{borderTop: "1px solid black", padding: "5px 0px 5px 0px"}} key={index}>
                            <h5 style={{margin: "0px"}}>
                                {user.first_name} {user.last_name}
                                {/* TODO Launch Popup */}
                                <span style={{float: 'right', marginTop: "4px"}}>
                                  <svg style={{width: "40", height: "40"}} viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                                </span>
                            </h5>
                            <p style={{margin: "0px"}}>
                                {user.email}
                            </p>
                        </div>
                    )
                })
              }
          </div>
          <ConfirmModal
            qrData={this.state.participantData}
            modalVisible={this.state.modalVisible}
            closeModal={this.closeModal}
          />
          {/* Render Toast (This can go anywhere inside the render. It doesn't have to be at bottom) */}
          {failureToast}
          {successToast}
          {warningToast}
        </div>
      </div>
    );
  }
}
const style : { [key: string]: React.CSSProperties } = {
  pageContainer : {
    padding: "20px",
    marginTop: "20px",
    width: '100vw',
  }
};

const mapStateToProps = state => ({
  userData: state.auth.userData
  /*event: state.selection.eventName,
  attribute: state.selection.attribute,*/
});

const mapDispatchToProps = dispatch => ({
  /*login: (email:string, password:string) => dispatch(actions.login(email, password))*/
});

export default connect(mapStateToProps, mapDispatchToProps)(Selection);