import Navbar from 'react-bootstrap/Navbar'
import React from 'react';

/*
    Props leftIconSrc and rightIconSrc have to match the name exactly of the .svg file in @/src/assets
*/
interface IProps {
    leftIconSrc? : string;
    rightIconSrc? : string;

    /*
        TODO: Have the sources to redirect when clicked
    */
}

interface IState {}

class TopNavbar extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  // Given the props create the needed toast initializer
  render() {
    var {
        leftIconSrc,
        rightIconSrc
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


    return (
        <div>
            <Navbar style={style.navSpacing}>
                <Navbar style={style.navSpacing}>
                    {/* TODO: Update href */}
                    <Navbar.Brand href="https://en.wikipedia.org/wiki/Special:Random" style={style.logoContainer}>
                        {leftIcon}
                    </Navbar.Brand>
                </Navbar>
                <Navbar style={style.navSpacing}>
                    {/* TODO: Update href */}
                    <Navbar.Brand href="https://en.wikipedia.org/wiki/Special:Random" style={style.logoContainer}>
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
                    <Navbar.Brand href="https://en.wikipedia.org/wiki/Special:Random" style={style.logoContainer}>
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
  

export default TopNavbar
