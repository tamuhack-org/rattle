import React from 'react';
import QrReader from 'react-qr-reader';
import { LoginData } from '../../types/LoginType';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'

interface IProps {
  isLoggedIn: boolean;
  isLoading: boolean;
  userData: LoginData;
  error: string;
  login: (email: string, password: string) => Promise<object>;
}

interface IState {
  qrText: string;
  delay: number;
  frontCamera: boolean;
}

class QRScan extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {qrText: "", delay: 500, frontCamera: true}
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
  }

  handleScan(data) {
    console.log(data);
  }

  handleError(error) {
    console.log(error);
  }

  switchCamera() {
    console.log(!this.state.frontCamera);
    this.setState({frontCamera: !this.state.frontCamera});
  }

  componentWillMount() {
    console.log("NEW SHIT!!");
    console.log(this.props);
  }

  render() {
    const cameraString = this.state.frontCamera ? 'user' : 'environment';
    return (
      <div>
        <Navbar>
          <Navbar.Brand href="https://en.wikipedia.org/wiki/Special:Random">
            <img
              alt=""
              src={require("../../assets/arrowleft.svg")}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>


          <Navbar className="ml-auto">
            <Navbar.Brand href="https://en.wikipedia.org/wiki/Special:Random">
              <img
                alt=""
                src={require("../../assets/hiss.svg")}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
            </Navbar.Brand>
          </Navbar>


          <Navbar className="ml-auto">
            <Navbar.Brand href="https://en.wikipedia.org/wiki/Special:Random">
              <img
                alt=""
                src={require("../../assets/magnifying.svg")}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
            </Navbar.Brand>
          </Navbar>

        </Navbar>
      <div style={style.pageContainer}>
        <div style={style.selectionContainer}>
          <Button style={{width: '40vw', height: '5vh'}}>Event</Button>
          <Button style={{width: '40vw', height: '5vh'}}>Attribute</Button>
        </div>
        <Button
          style={style.switchCameraContainer}
          onClick={this.switchCamera}>
          Switch
        </Button>
        <QrReader
          style={{width: '100%', alignItems: 'center', alignSelf: 'center', justifyContent: 'center'}}
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          facingMode={cameraString}
        />
      </div>
      </div>

    );
  }
}

const style : { [key: string]: React.CSSProperties } = {
  pageContainer : {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'black',
    paddingTop: '10vh'
  },
  selectionContainer: {
    display: 'flex',
    width: '100vw',
    height: '10vh',
    justifyContent: 'space-around'
  },
  switchCameraContainer: {

  }
};

const mapStateToProps = state => ({
  event: state.selection.event,
  attribute: state.selection.attribute,
});

export default connect(mapStateToProps)(QRScan);
