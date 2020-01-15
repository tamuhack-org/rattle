import React, { CSSProperties } from 'react';
import axios from 'axios';
import QrReader from 'react-qr-reader';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Search from '../Search/Search';
import { LoginData, QRData } from '../../types/TypeObjects';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavbar from './../../Components/navbar';
import Select from 'react-select'

interface IProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  userData: LoginData;
  error: string;
  event: string;
  attribute: string;
  login: (email: string, password: string) => Promise<object>;
}

interface IState {
  event: string;
  attribute: string;
  qrData: QRData;
  delay: number;
  frontCamera: boolean;
  confirmVisible: boolean;
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
    confirmVisible: false}
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
        console.log("QR code has invalid properties!");
      }
    } catch (exception) {
      console.log(exception)
      // TODO 
      // Toast for invalid QR Code
    }
  }

  handleError = (error) => {
    
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
    this.setState({
      event: val
    })
  }

  // Gets called every time the second select form has an option change.
  attributeSelectChange = (option, actions) => {
    var val = option ? option.value : "";
    this.setState({
      attribute: val
    })
  }

  // Using the event state determine what options to return.
  // These will be displayed on the second dropdown
  determineAttributes = () => {
    // TODO
    return [
      { value: 'c', label: 'Attr. C' },
      { value: 's', label: 'Attr. S' },
      { value: 'v', label: 'Attr. V' }
    ]
  }

  render() {
    var {
      event,
      attribute
    } = this.state;

    const cameraString = this.state.frontCamera ? 'user' : 'environment';

    // Hardcoded event options. Will need to be updated
    const eventOptions = [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
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
                isDisabled={event == ""}
                defaultValue={attribute == "" ? undefined : attributeOptions.filter( v => v['value'] == attribute )[0]}
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
              onError={this.handleError}
              onScan={this.handleScan}
              facingMode={cameraString}
            />
            <Button
              style={style.switchCameraContainer}
              onClick={this.switchCamera}>
              Switch
            </Button>
          </div>
          <ConfirmModal 
            qrData={this.state.qrData}
            modalVisible={this.state.confirmVisible}
            closeModal={this.hide}
          />
        </div>
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

/*
  TODO: Make the event and attribute state stored in redux
*/

export default connect(mapStateToProps)(QRScan);
