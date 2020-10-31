import React, { Component } from "react";
import { connect } from "react-redux";
import { signup, signUpStart,clearAuthState  } from "../actions/auth";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {

      email: "",
      password: "",
      username: "",
      confirm_password: "",
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  

  handleInputChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirm_password, username } = this.state;

    if (email && password && confirm_password && username) {
      this.props.dispatch(signUpStart());
      this.props.dispatch(signup(email, password, confirm_password, username));
    }
  };

  render() {
    const { inProgress, error } = this.props.auth;
    return (
      <form className="login-form">
        <span className="login-signup-header">Sign Up</span>
        {error && <div className="alert error-dailog">{error}</div>}
        <div className="field">
          <input
            type="text"
            placeholder="Name"
            required
            onChange={(e) => this.handleInputChange("name", e.target.value)}
          />
        </div>
        <div className="field">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => this.handleInputChange("email", e.target.value)}
          />
        </div>

        <div className="field">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => this.handleInputChange("password", e.target.value)}
          />
        </div>
        <div className="field">
          <input
            type="password"
            placeholder="Confirm_Password"
            required
            onChange={(e) =>
              this.handleInputChange("confirm_password", e.target.value)
            }
          />
        </div>

        <div className="field">
          <button onClick={this.onFormSubmit} disabled={inProgress}>
            SignUp
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  auth,
});
export default connect(mapStateToProps)(SignUp);
