import { toast, ToastContainer } from 'react-toastify';
import React from 'react';

/*
    Example: <Toast type="error" text="Failed to login." id={this.state.currentToastID}/>
    https://fkhadra.github.io/react-toastify/
    types:
        info -> light blue
        success -> green
        warning > yellow
        error -> red
        default -> white
    text: What the toast displays
    id: Needed to keep track of toasts and make sure each are unique. 
*/

// Arguments every toast will have.
var commonArgs : object = {
    position: "bottom-center",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
}

interface IProps {
    type: string;
    text: string;
    id: number;
    callback?: any;
}

interface IState {}

class Toast extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  // Given the props create the needed toast initializer
  generateToast = () => {
    var {
        type,
        text,
        callback
    } = this.props


    // var commonArgsModified = JSON.parse(JSON.stringify(commonArgs));

    // if(this.state.callback)
    commonArgs["onClose"] = callback;

    var cases = {
        "info": () => toast.info(text, commonArgs),
        "success": () => toast.success(text, commonArgs),
        "warning": () => toast.warn(text, commonArgs),
        "error": () => toast.error(text, commonArgs)
    }

    var key = type.toLocaleLowerCase();


    // Check if key one of the valid ones above, or return default toast (white background)
    return (key in cases) ? cases[key] : () => toast(text, commonArgs)
  }

  render() {
    // Get toast initializer
    const toastOptions = this.generateToast();

    toast.dismiss();  // <-- Remove all current toasts

    // Return a toast inside a toast container to parent component
    return (
        <div>
            <span style={{display: "none"}}>
                {/* I shouldn't need this, but react inserts random text that I hid here. */}
                {toastOptions()}
            </span>
            <ToastContainer />
        </div>
    );
  }
}

export default Toast
