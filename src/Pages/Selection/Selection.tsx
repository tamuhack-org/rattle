import React from 'react';
import QrReader from 'react-qr-reader';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';

interface IProps {
  event: string;
  attribute: string;
}

interface IState {
  event: string;
  attribute: string;
}

class Selection extends React.PureComponent<IProps, IState> {
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
  pageContainer : {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    alignItems: 'center',
  },
};

const mapStateToProps = state => ({
  event: state.selection.eventName,
  attribute: state.selection.attribute,
});

const mapDispatchToProps = dispatch => ({
  /*login: (email:string, password:string) => dispatch(actions.login(email, password))*/
});

export default connect(mapStateToProps, mapDispatchToProps)(Selection);
