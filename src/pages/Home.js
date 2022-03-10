import React from 'react';

class Home extends React.Component {

  handleClickLink(to) {
    const { history } = this.props;
    history.push(`/${to}`);
  }

  render() {
    return (
      <form className="d-flex flex-column justify-content-center rounded form">
        <h3 className="mb-5 text-white fw-bold">NBA RECORDS</h3>
        <button
          className="text-uppercase btn btn-play fw-bold mb-3"
          type="submit"
          onClick={ () => this.handleClickLink('login') }
          data-testid="btn-play"
        >
          Logar
        </button>
        <button
          className="text-uppercase btn btn-play fw-bold mb-3"
          type="submit"
          onClick={ () => this.handleClickLink('/signup') }
          data-testid="btn-play"
        >
          SignUp
        </button>
      </form>
    );
  }
}

export default Home;
