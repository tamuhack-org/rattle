import Navbar from 'react-bootstrap/Navbar'
import React from 'react';
import { Redirect } from 'react-router-dom';
import * as actions from '../redux/actions/authActions';
import { connect } from 'react-redux';

/*
    Props leftIconSrc and rightIconSrc have to match the name exactly of the .svg file in @/src/assets
*/
interface IProps {
    leftIconSrc? : string;
    rightIconSrc? : string;
    leftRedirectRoute? : string;
    rightRedirectRoute? : string;
    logout: () => void;
    /*
        TODO: Have the sources to redirect when clicked
    */
}

interface IState {
    leftRedirect: boolean;
    rightRedirect: boolean;
    middleRedirect: boolean;
}

class TopNavbar extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {leftRedirect: false, rightRedirect: false, middleRedirect: false};
  }

  redirect = (redirectRoute: string) => {
    if(redirectRoute === "/") {
        this.props.logout();
    }
    return <Redirect to={redirectRoute} />
  }

  onLeftPress = () => {
    this.setState({ leftRedirect: true });
  }

  onRightPress = () => {
    this.setState({ rightRedirect: true });
  }

  onMiddlePress = () => {
      this.setState({ middleRedirect: true });
  }

  render() {
    var {
        leftIconSrc,
        rightIconSrc,
        leftRedirectRoute,
        rightRedirectRoute
    } = this.props;

    var leftIcon = leftIconSrc ? (
        <img 
            alt=""
            src={require(`../assets/${leftIconSrc}.svg`)}
            width="30"
            height="30"
            className="d-inline-block align-top"
        />
    ) : undefined

    var rightIcon = rightIconSrc ? (
        <img 
            alt=""
            src={require(`../assets/${rightIconSrc}.svg`)}
            width="30"
            height="30"
            className="d-inline-block align-top"
        />
    ) : undefined

    if (this.state.leftRedirect && this.props.leftRedirectRoute !== undefined) {
        return this.redirect(this.props.leftRedirectRoute);
    }

    if (this.state.rightRedirect && this.props.rightRedirectRoute !== undefined) {
        return this.redirect(this.props.rightRedirectRoute);
    }

    if(this.state.middleRedirect) {
        return this.redirect("/select");
    }

    return (
        <div>
            <Navbar style={style.navSpacing}>
                <Navbar style={style.navSpacing}>
                    {/* TODO: Update href */}
                    <Navbar.Brand onClick={this.onLeftPress} style={style.logoContainer}>
                        {leftIcon}
                    </Navbar.Brand>
                </Navbar>
                <Navbar style={style.navSpacing}>
                    {/* TODO: Update href */}
                    <Navbar.Brand style={style.logoContainer}>
                    <img
                        alt=""
                        src={require("../assets/hiss.svg")}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                    </Navbar.Brand>
                </Navbar>
                <Navbar style={style.navSpacing}>
                    {/* TODO: Update href */}
                    <Navbar.Brand onClick={this.onRightPress} style={style.logoContainer}>
                        {rightIcon}
                    </Navbar.Brand>
                </Navbar>
            </Navbar>
        </div>
    );
  }
}

const style : { [key: string]: React.CSSProperties } = {
    logoContainer : {
        marginRight: "0px",
        width: "30px"
    },
    navSpacing: {
        justifyContent: "space-between"
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(actions.logout())
});
  
export default connect(mapStateToProps, mapDispatchToProps)(TopNavbar);
