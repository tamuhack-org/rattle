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

  render() {
    const cameraString = this.state.frontCamera ? 'user' : 'environment';
    return (
      <div>
        <TopNavbar leftIconSrc="arrowleft" rightIconSrc="magnifying" leftRedirectRoute="/select" rightRedirectRoute="/search"/>
        <div style={style.pageContainer}>
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
    paddingTop: '10vh'
  },
  selectionContainer: {
    display: 'flex',
    width: '100vw',
    height: '10vh',
    justifyContent: 'space-around'
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
  }
};

const mapStateToProps = state => ({
  event: state.selection.event,
  attribute: state.selection.attribute,
  userData: state.auth.userData,
});

export default connect(mapStateToProps)(QRScan);
