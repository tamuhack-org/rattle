import React from 'react';
import { Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppActions } from '../../types/actions';
import * as actions from '../../redux/actions/selectionActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'
import Button from 'react-bootstrap/Button';
import TopNavbar from './../../Components/navbar';
import { LoginData } from '../../types/TypeObjects';

import { toast, ToastContainer } from 'react-toastify';
import { commonToastProperties } from './../../Components/toast';

interface IProps {
  event: string;
  attribute: string;
  userData: LoginData,
  updateSelection: (event: string, attribute: string) => Dispatch<AppActions>;
}

interface IState {
  event: string;
  attribute: string;
  redirectToScan: boolean;
  redirectToLogin: boolean;
}

class Selection extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      event: this.props.event,
      attribute: this.props.attribute,
      redirectToScan: false,
      redirectToLogin: false // this.props.userData === undefined
    }
  }

  componentDidMount() {
    if(this.props.userData == undefined) {
      toast.error("Not Logged In", {
        ...commonToastProperties, 
        onClose: () => this.setState({ redirectToLogin: true })
      });
    }
  }


  // Gets called every time the first select form has an option change.
  eventSelectChange = (option, actions) => {
    var val = option ? option.value : "";
    this.setState({
      event: val,
      // Every event has a none options so this is the default. Stylistic change 
      attribute: "NONE"
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

  handleScanSubmit = () => {
    this.props.updateSelection(this.state.event, this.state.attribute);
    this.setState({ redirectToScan: true });
    // TODO Alert user about invalid selection
  }

  isDisabled = () => {
    
  }

  render() {
    var {
      event,
      attribute,
      redirectToScan,
      redirectToLogin
    } = this.state;

    if(redirectToLogin) {
      return <Redirect to='/' />
    }

    if(redirectToScan) {
      return <Redirect to='/scan' />
    }

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

    // const eventOptions = [
    //   { value: 'checked_in', label: 'Check In' },
    //   { value: 'BREAKFAST', label: 'Breakfast' },
    //   { value: 'LUNCH', label: 'Lunch' },
    //   { value: 'DINNER', label: 'Dinner' },
    //   { value: 'MIDNIGHT_SNACK', label: 'Midnight Snack' },
    //   { value: 'WorkshopEvent', label: 'Workshop' }
    // ]

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
        <TopNavbar rightIconSrc="logout" rightRedirectRoute="/" />
        <div style={style.pageContainer}>
          <h2 style={{ fontSize: '36px', color: "#FF7C93", marginBottom: "40px" }}>
            Select a scan...
          </h2>

          {/* React-Select component */}
          <Select
            options={eventOptions}
            formatGroupLabel={formatGroupLabel}
            placeholder="Event"
            isClearable={true}
            isSearchable={ false }
            // Uses the event state to determine if any objects in the eventOptions array have a value equal to event. 
            //  If so, return the first object where this is valid. (This logic is repeated 4 times) to select the defaul. 
            defaultValue={event == "" ? undefined : eventOptions.filter( v => v['value'] == event )[0]}
            onChange={this.eventSelectChange}
          />
          <br />

          {/* React-Select component */}
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
            onChange={this.attributeSelectChange}
            isSearchable={ false }
          />
          <br />

          <Button block
            style={{border: "1px solid #FF7C93", backgroundColor: "#FF7C93"}}
            onClick={this.handleScanSubmit}
            disabled={! (event && attribute)}
          >
            Start Scanning
          </Button>
        </div>

        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}
const style : { [key: string]: React.CSSProperties } = {

  // Changed, no longer flex and MarginTop is hardcoded
  pageContainer : {
    padding: "20px",
    marginTop: "12vh",
    width: '100vw',
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
  }
};

const mapStateToProps = state => ({
  event: state.selection.event,
  attribute: state.selection.attribute,
  userData: state.auth.userData
});

const mapDispatchToProps = dispatch => ({
  updateSelection: (event:string, attribute:string) => dispatch(actions.updateSelection(event, attribute))
});

export default connect(mapStateToProps, mapDispatchToProps)(Selection);
