import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { validLogin, fetchToken } from '../redux/actions';
import './login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.setEmailAndName = this.setEmailAndName.bind(this);
  }

  componentDidMount() {
    this.setEmailAndName();
  }

  setEmailAndName() {
    const { name, password } = this.props;
    this.setState({
      name,
      password,
    });
  }

  async handleClickLogin(event) {
    event.preventDefault();
    const { history, dispatchValidLogin, dispatchfetchToken, token } = this.props;
    const { name, password } = this.state;
    await dispatchfetchToken(name, password);
    localStorage.setItem('token', token);
    dispatchValidLogin(name, password);
    history.push('/user');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  renderNameInput() {
    const { name } = this.state;
    return (
      <label className="form-label text-start mb-3 text-white fw-bold" htmlFor="name">
        Nome do Usuário
        <input
          className="form-control input"
          type="text"
          name="name"
          id="name"
          value={ name }
          data-testid="input-player-name"
          onChange={ this.handleChange }
          />
      </label>
    );
  }

  renderPasswordInput() {
    const { password } = this.state;
    return (
      <label className="form-label text-start mb-3 text-white fw-bold" htmlFor="password">
        Password do Usuário
        <input
          className="form-control input removeMargin"
          type="password"
          name="password"
          id="password"
          value={ password }
          data-testid="input-password"
          onChange={ this.handleChange }
        />
      </label>
    );
  }
  
  renderForm() {
    const { name, password } = this.state;
    const isDisabled = !name || !password;
    return (
      <form className="d-flex flex-column justify-content-center rounded form">
        <h3 className="mb-5 text-white fw-bold">NBA RECORDS</h3>
        { this.renderNameInput() }
        { this.renderPasswordInput() }
        <button
          className="text-uppercase btn btn-play fw-bold mb-3"
          type="submit"
          disabled={ isDisabled }
          onClick={ this.handleClickLogin }
          data-testid="btn-play"
        >
          Logar!
        </button>
      </form>
    );
  }

  render() {
    return (
      <div className="text-center">
        { this.renderForm() }
      </div>
    );
  }
}

Login.propTypes = {
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  dispatchValidLogin: PropTypes.func.isRequired,
  dispatchfetchToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchValidLogin: (name, password) => dispatch(validLogin(name, password)),
  dispatchfetchToken: (name, password) => dispatch(fetchToken(name, password)),
});

const mapStateToProps = (state) => ({
  name: state.user.user.name,
  password: state.user.user.password,
  token: state.user.user.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
