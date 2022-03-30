import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPlayers } from '../redux/actions';

class User extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      token: '',
      players: [],
    };

    this.renderUserInfo = this.renderUserInfo.bind(this);
  }

  componentDidMount() {
    this.setNameAndPlayers();
  }

  async setNameAndPlayers() {
    const { dispatchFetchPlayers, token } = this.props;
    await dispatchFetchPlayers(token);
    const { name, players } = this.props;
    this.setState({
      name,
      token,
      players
    });
  }

  renderUserInfo() {
    return (
      <h1>Welcome Back { this.state.name }</h1>
    )
  }

  renderUserPlayers() {
    return (
      <div>
        { this.state.players.length !== 0 ? this.state.players[0].first_name : false }
      </div>
    )
  }

  render() {
    return (
      <div className="text-center">
        { this.renderUserInfo() }
        { this.renderUserPlayers() }
      </div>
    );
  }

}

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchPlayers: (token) => dispatch(fetchPlayers(token)),
});

const mapStateToProps = (state) => ({
  name: state.user.name,
  token: state.user.token,
  players: state.user.players
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
