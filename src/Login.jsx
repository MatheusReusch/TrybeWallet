import React from "react";
import { connect } from "react-redux";
import { saveEmail } from "./actions";

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      pass: "",
      disabled: true,
    };
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({ [name]: value }, () => {
      const { email, pass } = this.state;
      if (email.includes("@") && email.includes(".com") && pass.length >= 6) {
        this.setState({ disabled: false });
      } else {
        this.setState({ disabled: true });
      }
    });
  }

  render() {
    const { email, pass, disabled } = this.state;
    const { saveMail, history } = this.props;
    return (
      <section>
        <input
          data-testid="email-input"
          onChange={(event) => this.handleChange(event)}
          type="email"
          name="email"
          value={email}
        />
        <input
          data-testid="password-input"
          onChange={(event) => this.handleChange(event)}
          type="password"
          name="pass"
          value={pass}
        />
        <button onClick={ () => {
            history.push('/carteira')
            saveMail(email)
            } } disabled={disabled}>Entrar</button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveMail: (email) => dispatch(saveEmail(email)),
})

export default connect(null, mapDispatchToProps)(Login);
