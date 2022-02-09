import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { saveEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      pass: '',
      disabled: true,
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    const six = 6;
    this.setState({ [name]: value }, () => {
      const { email, pass } = this.state;
      if (email.includes('@') && email.includes('.com') && pass.length >= six) {
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
          onChange={ (event) => this.handleChange(event) }
          type="email"
          name="email"
          value={ email }
        />
        <input
          data-testid="password-input"
          onChange={ (event) => this.handleChange(event) }
          type="password"
          name="pass"
          value={ pass }
        />
        <button
          type="button"
          onClick={ () => {
            history.push('/carteira');
            saveMail(email);
          } }
          disabled={ disabled }
        >
          Entrar
        </button>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveMail: (email) => dispatch(saveEmail(email)),
});

Login.propTypes = {
  saveMail: propTypes.func.isRequired,
  history: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
