import React, { Component } from "react";
import { connect } from "react-redux";
import { signup, signUpStart,clearAuthState  } from "../actions/auth";
import { Redirect } from "react-router-dom";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {

      email: "",
      password: "",
      name: "",
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
    const { email, password, confirm_password, name } = this.state;

    if (email && password && confirm_password && name) {
      this.props.dispatch(signUpStart());
      this.props.dispatch(signup(email, password, confirm_password, name));
    }
  };

  render() {
    const { inProgress, error,isLoggedin } = this.props.auth;

    if(isLoggedin){
      return <Redirect to="/" />
    }
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
