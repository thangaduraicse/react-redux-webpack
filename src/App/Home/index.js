import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Row, Col} from "react-bootstrap";
import ReactDropdown from "../react-dropdown";

import {getDropdownOption, clearHomeStore} from "./Actions";

@connect(
  state => ({
    isRequesting: state.homeReducer.isRequesting,
    options: state.homeReducer.results,
    error: state.homeReducer.exception.message
  }),
  dispatch => ({
    getDropdownOption: bindActionCreators(getDropdownOption, dispatch),
    clearHomeStore: bindActionCreators(clearHomeStore, dispatch)
  })
)
export default class Home extends React.Component {
  static get propTypes() {
    return {
      isRequesting: PropTypes.bool,
      options: PropTypes.arrayOf(PropTypes.object).isRequired,
      error: PropTypes.string,
      getDropdownOption: PropTypes.func.isRequired,
      clearHomeStore: PropTypes.func.isRequired
    };
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      results1: null,
      results2: null,
      results3: null,
      results4: null
    };
  }
  componentDidMount() {
    this.props.getDropdownOption("/api/dropdown-options");
  }
  componentWillUnmount() {
    this.props.clearHomeStore();
  }
  onChangeCallback = (results, key) => {
    this.setState({[key]: results});
  }
  render() {
    const {isRequesting, options, error} = this.props;
    return (
      <Row>
        <Col xs={ 12 }>
          <h2>
            <em> Hi and welcome to My StackOverflow !! Let&#39;s do some searching. 
            Click search from the nav bar to navigate to the search page !!</em>
          </h2>
        </Col>
        <Col xs={ 12 }>
          <div>Single Select without searchable</div>
          {
            isRequesting ? null : options && options.length ? (
              <ReactDropdown
                options={ options }
                labelKey="label"
                valueKey="value"
                onChange={ r => this.onChangeCallback(r, "results1") }
                value={ this.state.results1 }
              />
            ) : error && error.length ? (
              <div className="error">{error}</div>
            ) : null
          }
        </Col>
        <Col xs={ 12 }>
          <pre>
            Results:
            <code>{JSON.stringify(this.state.results1)}</code>
          </pre>
        </Col>
        <Col xs={ 12 }>
          <div>Single Select searchable</div>
          {
            isRequesting ? null : options && options.length ? (
              <ReactDropdown
                options={ options }
                labelKey="label"
                valueKey="value"
                onChange={ r => this.onChangeCallback(r, "results2") }
                searchable
                value={ this.state.results2 }
              />
            ) : error && error.length ? (
              <div className="error">{error}</div>
            ) : null
          }
        </Col>
        <Col xs={ 12 }>
          <pre>
            Results:
            <code>{JSON.stringify(this.state.results2)}</code>
          </pre>
        </Col>
        <Col xs={ 12 }>
          <div>Multi Select without searchable</div>
          {
            isRequesting ? null : options && options.length ? (
              <ReactDropdown
                options={ options }
                labelKey="label"
                valueKey="value"
                onChange={ r => this.onChangeCallback(r, "results3") }
                multi
                value={ this.state.results3 }
              />
            ) : error && error.length ? (
              <div className="error">{error}</div>
            ) : null
          }
        </Col>
        <Col xs={ 12 }>
          <pre>
            Results:
            <code>{JSON.stringify(this.state.results3)}</code>
          </pre>
        </Col>
        <Col xs={ 12 }>
          <div>Multi Select with searchable</div>
          {
            isRequesting ? null : options && options.length ? (
              <ReactDropdown
                options={ options }
                labelKey="label"
                valueKey="value"
                onChange={ r => this.onChangeCallback(r, "results4") }
                searchable
                multi
                value={ this.state.results4 }
              />
            ) : error && error.length ? (
              <div className="error">{error}</div>
            ) : null
          }
        </Col>
        <Col xs={ 12 }>
          <pre>
            Results:
            <code>{JSON.stringify(this.state.results4)}</code>
          </pre>
        </Col>
      </Row>
    );
  }
}
