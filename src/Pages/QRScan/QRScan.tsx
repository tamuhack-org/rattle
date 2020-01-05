import React from 'react';
import QrReader from 'react-qr-reader';
import { LoginData } from '../../types/LoginType';
import 'bootstrap/dist/css/bootstrap.min.css';

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
}

class QRScan extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div style={style.pageContainer}>

      </div>
    );
  }
}

const style : { [key: string]: React.CSSProperties } = {

};

export default QRScan;
