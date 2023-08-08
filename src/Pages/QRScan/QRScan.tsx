import React from 'react';
import QrReader from 'react-qr-reader';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import { LoginData, QRData } from '../../types/TypeObjects';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppActions } from '../../types/actions';
import * as actions from '../../redux/actions/selectionActions';
import Button from 'react-bootstrap/Button';
import 'rodal/lib/rodal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavbar from './../../Components/navbar';
import Select from 'react-select'
import { Redirect } from 'react-router-dom';

import { toast, ToastContainer } from 'react-toastify';
import { commonToastProperties } from './../../Components/toast';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  userData: LoginData;
  error: string;
  event: string;
  attribute: string;
  login: (email: string, password: string) => Promise<object>;
  updateSelection: (event: string, attribute: string) => Dispatch<AppActions>;
}

interface IState {
  event: string;
  attribute: string;
  qrData: QRData;
  delay: number;
  frontCamera: boolean;
  confirmVisible: boolean;
  redirectToLogin: boolean;
}

class QRScan extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {qrData: {
      first_name: "",
      last_name: "",
      email: "",
    },
    event: this.props.event,
    attribute: this.props.attribute,
    delay: 500, 
    frontCamera: true, 
    confirmVisible: false,
    redirectToLogin: false}
  }

  componentDidMount() {
    console.log("componentDidMount")
    if(this.props.userData == undefined) {
      toast.error("Not Logged In", {
        ...commonToastProperties, 
        onClose: () => this.setState({ redirectToLogin: true })
      });
    }
  }

  handleScan = async (data: string) => {
    if(data === null || this.state.confirmVisible) {
      return;
    }
    try {
      var qrObj = JSON.parse(data);
      if(Object.prototype.hasOwnProperty.call(qrObj, 'email') && 
        Object.prototype.hasOwnProperty.call(qrObj, 'first_name') && 
        Object.prototype.hasOwnProperty.call(qrObj, 'last_name')) {

        this.setState({ qrData: qrObj, confirmVisible: true });
      } else {
        console.log("Here 1")
        toast.success("QR scan successful.", commonToastProperties);
        console.log("Here 2")
      }
    } catch (exception) {
      console.log("Here 3")
      toast.error("QRScan Line 81: exception", {...commonToastProperties, autoClose: 3000});
      console.log("Here 4")
    }
  } 

  switchCamera = () => {
    this.setState({frontCamera: !this.state.frontCamera});
  }

  show = () => {
    this.setState({ confirmVisible: true });
  }

  hide = () => {
    this.setState({ confirmVisible: false });
  }


  // Gets called every time the first select form has an option change.
  eventSelectChange = (option, actions) => {
    var val = option ? option.value : "";
    if(val !== "") {
      this.props.updateSelection(val, "NONE");
    }
    
    this.setState({
      event: val,
      // Every event has a none options so this is the default. Stylistic change 
      attribute: "NONE"
    })
  }

  // Gets called every time the second select form has an option change.
  attributeSelectChange = (option, actions) => {
    var val = option ? option.value : "";
    if(val !== "") {
      this.props.updateSelection(this.props.event, val);
    }
    this.setState({
      attribute: val
    })
  }

  // Using the event state determine what options to return.
  // These will be displayed on the second dropdown
  determineAttributes = () => {
    // https://github.com/tamuhack-org/Ouroboros/blob/86da19f7354388b77d3bda958f7054426debd728/hiss/volunteer/models.py#L6
var foodChoices = [
      { value: 'R', label: 'Regular'},
      { value: 'V', label: 'Vegan'},
      { value: 'G', label: 'Gluten Free'}
    ]
    if(this.state.event) {
      // Options must match the eventOptions values
      var options =  {
        "checked_in": [ { value: 'NONE', label: 'N/A'}, ],
        "WorkshopEvent": [ { value: 'NONE', label: 'N/A'}, ],
        "B": foodChoices,
        "L": foodChoices,
        "D": foodChoices,
        "MS": foodChoices,
        "B2": foodChoices,
        "L2": foodChoices
      }
      return this.state.event in options ? options[this.state.event] : undefined
    }
    return undefined
  }

  render() {
    var {
      event,
      attribute,
      redirectToLogin
    } = this.state;

    if(redirectToLogin) {
      return <Redirect to='/' />
    }

    const cameraString = this.state.frontCamera ? 'user' : 'environment';

    // https://github.com/tamuhack-org/Ouroboros/blob/d1bafcdfaf6b54eaf7bf9a6720373e0bd3ec8855/hiss/volunteer/views.py
    const eventOptions = [
      { value: 'checked_in', label: 'Check In' },
      { value: 'WorkshopEvent', label: 'Workshop (ANY)' },
      { value: 'B', label: 'Breakfast (SAT)' },
      { value: 'L', label: 'Lunch (SAT)' },
      { value: 'D', label: 'Dinner' },
      { value: 'MS', label: 'Midnight Snack' },
      { value: 'B2', label: 'Breakfast (SUN)' },
      { value: 'L2', label: 'Lunch (SUN)' }
    ]

    const attributeOptions = this.determineAttributes()

    // Formats the individual options in the select tags (react-select)
    const formatGroupLabel = data => (
      <div style={style.groupStyles}>
        <span>{data.label}</span>
        <span style={style.groupBadgeStyles}>{data.options.length}</span>
      </div>
    );

    return (
      <div>
        <TopNavbar leftIconSrc="arrowleft" rightIconSrc="magnifying" leftRedirectRoute="/select" rightRedirectRoute="/search"/>
        <div style={style.pageContainer}>
          {/* Selection Container */}
          <div style={style.selectionContainer}>
            <div style={style.halfContainer}>
              <Select
                options={eventOptions}
                formatGroupLabel={formatGroupLabel}
                placeholder="Event"
                isClearable={true}
                isSearchable={ false }
                styles={{
                  // https://stackoverflow.com/questions/55830799/how-to-change-zindex-in-react-select-drowpdown
                  menu: provided => ({ ...provided, zIndex: 9999 })
                }}
                defaultValue={event == "" ? undefined : eventOptions.filter( v => v['value'] == event )[0]}
                onChange={this.eventSelectChange}
              />
            </div>
            <div style={style.halfContainer}>
              <Select
                options={attributeOptions}
                formatGroupLabel={formatGroupLabel}
                placeholder="Attribute"
                isClearable={true}
                isDisabled={event == "" || event == "checked_in" || event == "WorkshopEvent"}
                value= {
                  attribute == "" || attributeOptions == undefined ? 
                  undefined : attributeOptions.filter( v => v['value'] == attribute )[0]
                }
                styles={{
                  // https://stackoverflow.com/questions/55830799/how-to-change-zindex-in-react-select-drowpdown
                  menu: provided => ({ ...provided, zIndex: 9999 })
                }}
                onChange={this.attributeSelectChange}
                isSearchable={ false }
              />
            </div>
          </div>
          <div>
            <QrReader
              style={{width: '100%', marginBottom: 20, alignItems: 'center', alignSelf: 'center', justifyContent: 'center'}}
              delay={this.state.delay}
              onScan={this.handleScan}
              facingMode={cameraString}
            />
            <Button
              style={style.switchCameraContainer}
              onClick={this.switchCamera}>
              Switch Camera
            </Button>
          </div>
          <ConfirmModal 
            qrData={this.state.qrData}
            modalVisible={this.state.confirmVisible}
            closeModal={this.hide}
          />
        </div>

        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}

const style : { [key: string]: React.CSSProperties } = {
  pageContainer : {
    display: 'flex',
    height: 'calc(100vh - 72px)',
    width: '100vw',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
    // paddingTop: '10vh'
  },
  selectionContainer: {
    padding: '30px 10px',
    marginBottom: "10px",
    backgroundColor: "#FF7C93",
    width: '100vw',
  },
  switchCameraContainer: {
    width: '80vw',
    height: '56px',
    backgroundColor: '#FF7C93',
    border: 0,
    outline: 0
  },
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
    border: '5px solid #5CD059',
    marginBottom: 50,
    paddingTop: 5,
    paddingBottom: 5
  },
  emailRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 0,
    marginBottom: 20,
    borderBottom: '1px #DEDEDE solid',
  },

  // Default React-Select styles
  groupBadgeStyles: {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    width: "200px;",
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  },

  // Default React-Select styles
  groupStyles: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  halfContainer: {
    width: "50%",
    padding: "0px 5px",
    display: "inline-block"
  }
  
};

const mapStateToProps = state => ({
  event: state.selection.event,
  attribute: state.selection.attribute,
  userData: state.auth.userData,
});

const mapDispatchToProps = dispatch => ({
  updateSelection: (event:string, attribute:string) => dispatch(actions.updateSelection(event, attribute))
});

export default connect(mapStateToProps, mapDispatchToProps)(QRScan);
