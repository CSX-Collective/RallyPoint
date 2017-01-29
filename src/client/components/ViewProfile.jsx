import React, { PropTypes } from 'react'

const ViewProfile = ({ viewUserData }) => {
  const { email, firstName, lastName, bio, imageUrl, following, followers } = viewUserData;
  return (
    <div className="view-profile-container">
      <h2>{firstName} {lastName}</h2>
      <h4 className="view-profile-email">{email}</h4>
      <img alt={`${firstName}'s profile pic`} className="view-profile-pic" src={imageUrl} />
      <p className="view-profile-bio">
        {bio}
      </p>
      <h4>Following: </h4> {following.map(followee => <span className="view-profile-followee">{ followee }</span>)}
      <h4>Followers: </h4> {followers.map(follower => <span className="view-profile-follower">{ follower }</span>)}
    </div>
  );
};

export default ViewProfile;
