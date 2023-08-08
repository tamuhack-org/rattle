import React from 'react';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import axios from 'axios';
import TopNavbar from './../../Components/navbar';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { QRData, LoginData } from '../../types/TypeObjects';
import { Redirect } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import { commonToastProperties } from './../../Components/toast';

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

        modalVisible: false,
        participantData: {
          "email": "",
          "first_name": "",
          "last_name": ""
        },

        redirectToLogin: false // this.props.userData === undefined
    }
  }

  componentDidMount() {
    if(this.props.userData == undefined) {
      toast.error("Not Logged In", {
        ...commonToastProperties, 
        onClose: () => this.setState({ redirectToLogin: true })
      });
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
        
        if(responseData.length == 0) {
          toast.warn("Search found no users.", commonToastProperties);
        } else {
          toast.success(`Search found ${responseData.length} user${responseData.length == 1 ? '': 's'}.`, commonToastProperties);
        }
        this.setState({users: responseData})
      }).catch(error => {
        toast.error("Invalid API Call", {...commonToastProperties, autoClose: 3000});
      });
    } else {
      toast.error("Invalid API Call", {...commonToastProperties, autoClose: 3000});
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

    if(this.props.userData === undefined) {
      console.log('ERROR')
      toast.error("Not Logged In", {
        ...commonToastProperties, 
        onClose: () => this.setState({ redirectToLogin: true })
      });
    }

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
                                <span style={{float: 'right', marginTop: "4px"}}>
                                  <svg style={{width: "40px", height: "40px"}} viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
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
          <ToastContainer autoClose={1500} />
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