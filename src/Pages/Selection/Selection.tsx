import React from 'react';
import QrReader from 'react-qr-reader';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/authActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select'
import Button from 'react-bootstrap/Button';

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

    this.state = {
      event: "",
      attribute: ""
    }
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
      { value: 'chocolate', label: 'Attr. C' },
      { value: 'strawberry', label: 'Attr. S' },
      { value: 'vanilla', label: 'Attr. V' }
    ]
  }

  handleScanSubmit = () => {
    if(this.state.event && this.state.attribute) {
      // TODO
      console.log('Sending a POST request ...')
    }
  }

  render() {
    var {
      event,
      attribute
    } = this.state;

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
          onChange={this.eventSelectChange}
        />
        <br />

        {/* React-Select component */}
        <Select
          options={attributeOptions}
          formatGroupLabel={formatGroupLabel}
          placeholder="Attribute"
          isClearable={true}
          isDisabled={event == ""}
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
    );
  }
}
const style : { [key: string]: React.CSSProperties } = {

  // Changed, no longer flex and MarginTop is hardcoded
  pageContainer : {
    padding: "20px",
    marginTop: "20vh",
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
  /*event: state.selection.eventName,
  attribute: state.selection.attribute,*/
});

const mapDispatchToProps = dispatch => ({
  /*login: (email:string, password:string) => dispatch(actions.login(email, password))*/
});

export default connect(mapStateToProps, mapDispatchToProps)(Selection);