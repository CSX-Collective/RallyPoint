import React, { PropTypes } from 'react'
import userObject from '../../tests/client/fixtures/userObject';
import ViewProfile from './ViewProfile';
import Loading from './Loading';

/* Profile Controller Component
 * Controller for the Container Component ProfileHolder
 * Handles requesting a given user id from the server
 * and rendering a profile view based on that data.
 * If the user is viewing their own profile, this component
 * will render EditProfile, which contains logic to update user records.
 * Otherwise, it will render ViewProfile, which contains logic for the currently
 * Logged-in user to follow/unfollow/DM the user being viewed.
 */

function fetchUser(id) {
  // *MOCK* go get this user from the server and return it
  return new Promise(function(resolve, reject) {
    window.setTimeout(function() {
      resolve({
        firstName: userObject.first_name,
        lastName: userObject.last_name,
        email: userObject.email,
        bio: userObject.bio,
        imageUrl: userObject.image_url,
        followers: userObject.followers,
        following: userObject.following,
      });
    }, 1000);
  });
}

function receiveViewUser(viewUser) {
  // state change handler to dispatch update action
  // once async fetchUser returns
  return function update(state) {
    return {
      ...state,
      viewUser,
      loadingProfile: false,
    };
  };
}

class Profile extends React.Component {
  componentWillMount() {
    fetchUser(this.props.viewUserId)
      .then(viewUser => this.setState(receiveViewUser(viewUser)));
  }
  render () {
    // these conditionals check if our async data has returned yet,
    // and if the user is viewing their own profile (which they can edit)
    // or someone else's.
    if (this.state.loadingProfile) return <Loading />
    if (this.props.viewUserId === this.state.user._id) {
      // this should actually return EditProfile once it exists
      return (<ViewProfile userData={this.state.viewUser} />);
    }
    return (<ViewProfile userData={this.state.viewUser} />);
  }
}

export default Profile;
