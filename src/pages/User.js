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
        <table>
          <th>Name</th>
          <th>Team</th>
          <th>Position</th>
          { this.state.players.map((player) => {
            const { first_name, position, team: { full_name } } = player;
            return (
              <td>
                <tr>{ first_name }</tr>
                <tr>{ full_name }</tr>
                <tr>{ position }</tr>
              </td>
            )
          })}
        </table>
      </div>
    )
  }

  render() {
    return (
      <div className="text-center">
        { this.renderUserInfo() }
        { (this.state.players.length !== 0 ? this.renderUserPlayers() : false) }
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
