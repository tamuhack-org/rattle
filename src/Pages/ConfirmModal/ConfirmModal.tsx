import React from 'react';
import { LoginData, QRData } from '../../types/TypeObjects';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {commonToastProperties} from './../../Components/toast';
import { toast, ToastContainer } from 'react-toastify';

interface IProps {
  userData: LoginData;
  event: string;
  attribute: string;

  qrData: QRData;
  modalVisible: boolean;
  closeModal: () => void;
}

interface IState {
  participantRegistered: boolean;
  foodRestrictions: string;
  applicationStatus: string;
  disableSubmit: boolean;
}

class ConfirmModal extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {participantRegistered: false, foodRestrictions: "None", applicationStatus: "", disableSubmit: false};
  }

  getRegisteredStatus = async (email: string) : Promise<{registeredStatus, foodRestrictions, applicationStatus}> => {
    let registeredStatus = false;
    let foodRestrictions = "None";
    let applicationStatus = "L"

    if (!this.props.modalVisible) {
      return {registeredStatus, foodRestrictions, applicationStatus};
    }

    var checkInStatusUrl = "https://register.tamuhack.com/api/volunteer/summary?email=" + email;
    await axios.get(
      checkInStatusUrl,
      {
         headers: {
           'content-type': 'application/json',
           authorization: 'Token ' + this.props.userData.data.token
         },
      }
    ).then(response => {
      // Potential Bug: This route gets sent two times. 
      // This makes the toast kind of look ugly. Not critical though
      toast.dismiss(); // Prevents a second toast from sending
      if(!response.data.checked_in && this.props.event != "checked_in") {
        // Set to top-center to make it look nicer. Optional
        toast.warn("User is not checked in. Contact Director!", {...commonToastProperties, autoClose: 4000});
      }

      if(
        this.props.event == "checked_in" &&
        !(response.data.status == "I" || response.data.status == "C")
      ) {
        toast.warn("User not authorized. Contact Director!", {...commonToastProperties, autoClose: 5000});
      }

      console.log(">>>", this.props, response.data)
      // &&
        // this.props.attribute.toLowerCase() != response.data.restrictions.toLowerCase() 
      
      if (
        this.props.event != "checked_in" && 
        this.props.event != "WorkshopEvent" 
        // !(this.props.attribute.toLowerCase() == 'none' && response.data.restrictions.toLowerCase() == 'other')
      ) {
        // Set to top-center to make it look nicer. Optional
        // toast.warn("Food restrictions don't match. Notify Hacker!", {...commonToastProperties, autoClose: 4000, position:"top-center"});
      }
      registeredStatus = response.data.checked_in;
      foodRestrictions = response.data.restrictions;
      applicationStatus = response.data.status;
    }).catch(exception => {
      console.log("EXCEPTION!", exception)
      toast.error(exception, {...commonToastProperties, autoClose: 3000});
    });

    return {registeredStatus, foodRestrictions, applicationStatus};
  }

  registerFood = async () => {
    const checkInFood = "https://register.tamuhack.com/api/volunteer/food";
    console.log("Register Food",       {
      "email": this.props.qrData.email,
      "meal": this.props.event,
      "restrictions": this.props.attribute
    })

    // Super hacky code, TH22 hotfix
    let new_meal_name = this.props.event + "";
    new_meal_name = this.props.attribute != "V" ? new_meal_name : this.props.event + "_V";
    new_meal_name = this.props.attribute != "G" ? new_meal_name : this.props.event + "_G";

    console.log(new_meal_name)

    await axios.post(checkInFood, 
      {
        "email": this.props.qrData.email,
        "meal": new_meal_name,
        "restrictions": this.props.attribute
      },
      {
      headers: {
        authorization: "Token " + this.props.userData.data.token,
        "content-type": "application/json"
      }
    }).then(response => {
      console.log("THEN")
      toast.success("User scan successful.", commonToastProperties);
    }).catch(exception => {
      console.log("CATCH", exception)
      toast.error(exception, {...commonToastProperties, autoClose: 3000});
    });
  };

  registerWorkshop = async () => {
    const checkInWorkshop = "https://register.tamuhack.com/api/volunteer/workshops";

    await axios.post(checkInWorkshop, 
      {
        "email": this.props.qrData.email,
      },
      {
      headers: {
        authorization: "Token " + this.props.userData.data.token,
        "content-type": "application/json"
      }
    }).then(response => {
      toast.success("User scan successful.", commonToastProperties);
    }).catch(exception => {
      toast.error(exception, {...commonToastProperties, autoClose: 3000});
    });
  }

  checkInUser = async () => {
    const checkInUrl = "https://register.tamuhack.com/api/volunteer/checkin";

    await axios.post(checkInUrl, 
      {
        "email": this.props.qrData.email
      },
      {
      headers: {
        authorization: "Token " + this.props.userData.data.token,
        "content-type": "application/json"
      }
    }).then(response => {
      toast.success("User scan successful.", commonToastProperties);
      this.setState({ participantRegistered: true });
    }).catch(exception => {
      toast.error(exception, {...commonToastProperties, autoClose: 3000});
      this.setState({participantRegistered: false});
    });
  };

  checkInEvent = async () => {
    const event = this.props.event;

    if(event === "checked_in") {
      await this.checkInUser();
    } else if(event === "WorkshopEvent") {
      await this.registerWorkshop();
    } else {
      await this.registerFood();
    }
  }

  disableSubmit = (registrationStatus) => {
    if(this.props.event === "checked_in") {
      return registrationStatus;
    }

    return !registrationStatus;
  }

  async componentDidUpdate() {
    const {registeredStatus, foodRestrictions, applicationStatus} = await this.getRegisteredStatus(this.props.qrData.email);
    const disableStatus = this.disableSubmit(registeredStatus);
    this.setState({ participantRegistered: registeredStatus, foodRestrictions: foodRestrictions, applicationStatus, disableSubmit: disableStatus});
  }

  render() {
    var eventName = "";
    var attribute = this.state.foodRestrictions === "None" ? "No Food Restrictions" : this.state.foodRestrictions;
    var buttonTitle = "Scan";

    if(this.props.event === 'checked_in') {
      eventName = "Check In";
      attribute = "No Attribute";
      buttonTitle = "Check In";
    } else if(this.props.event === 'WorkshopEvent') {
      eventName = "Workshop";
      attribute = "No Attribute";
    }

    var applicationStateText = {
      "P": "PENDING",
      "R": "REJECTED",
      "A": "ADMITTED",
      "C": "NOT CHECKED IN",
      "X": "DECLINED",
      "I": "CHECKED IN",
      "E": "EXPIRED",
      "L": "LOADING"
    }

    return (
    <div style={style.modalContainer}>
        <Rodal 
          visible={this.props.modalVisible} 
          onClose={this.props.closeModal}
          animation="slideUp"
          width={'70vw'}
          height={350}
          customStyles={{ marginBottom: 0, justifyContent: 'flex-end', paddingLeft: 25, paddingRight: 25 }}
        >
          <div style={style.badgeContainer}>
            <Badge style={{ marginRight: 15, padding: 10, backgroundColor: '#FFD9D9', fontSize: 15 }}>
              {eventName}
            </Badge>
            <Badge style={{ padding: 10, backgroundColor: '#D9EFFF', fontSize: 15 }}>
              {attribute}
            </Badge>
          </div>
          <div>
            <p style={{ display: 'flex', fontSize: 23, fontWeight: 'bold' }}>{this.props.qrData.first_name} {this.props.qrData.last_name}</p>
          </div>
          <div style={style.emailRow}>
            <p style={{ fontSize: 16, fontWeight: 'bold', margin: 0, paddingLeft: 0}}>
              Email
            </p>
            <p style={{ fontSize: 14, margin: 0 }}>
              {this.props.qrData.email}
            </p>
          </div>
          <div style={{...style.checkInStatusRow, borderColor: this.state.participantRegistered ? '#5CD059' : '#FFBFBF', fontSize: 20}}>
            <p style={{ display: 'flex', margin: 0, padding: 0}}>
              {applicationStateText[this.state.applicationStatus]}
              {/* {this.state.participantRegistered ? 'CHECKED IN' : 'NOT CHECKED IN'} */}
            </p>
          </div>
          <Button block
            style={style.confirmButton}
            disabled={this.state.disableSubmit}
            onClick={this.checkInEvent}
          >
            {buttonTitle}
          </Button>

        </Rodal>
        <ToastContainer autoClose={1500} />
      </div>
      );
    }
  }
  
    const style : { [key: string]: React.CSSProperties } = {
        modalContainer: {
            display: 'flex',
            backgroundColor: 'white',
            height: 350,
            padding: 30,
        },
        checkInStatusRow: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: '5px',
            borderStyle: 'solid',
            marginBottom: 50,
            paddingTop: 5,
            paddingBottom: 5
        },
        emailRow: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 0,
            paddingBottom: 10,
            marginBottom: 20,
            borderBottom: '1px #DEDEDE solid',
        },
        confirmButton: {
            // display: 'flex', Firefox issues
            justifyContent: 'center', 
            width: '100%', 
            height: '60px', 
            backgroundColor: '#FF7C93', 
            border: '0', 
            fontSize: '18px'
        },
        badgeContainer: {
            display: 'flex', 
            flexDirection: 'row', 
            paddingBottom: 0, 
            marginBottom: 15
        }
    };

    const mapStateToProps = state => ({
        event: state.selection.event,
        attribute: state.selection.attribute,
        userData: state.auth.userData,
    });

    export default connect(mapStateToProps)(ConfirmModal);
  
