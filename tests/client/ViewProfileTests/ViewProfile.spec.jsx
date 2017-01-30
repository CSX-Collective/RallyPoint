import React from 'react';
import { shallow, mount }
from 'enzyme';
import { expect }
from 'chai';
import ViewProfile from '../../../src/client/components/ViewProfile';
import userObject from '../fixtures/userObject';

const viewUser = {
  firstName: userObject.first_name,
  lastName: userObject.last_name,
  email: userObject.email,
  bio: userObject.bio,
  imageUrl: userObject.image_url,
  followers: userObject.followers,
  following: userObject.following,
};

describe('Component: <ViewProfile />', () => {
  const wrapper = shallow(<ViewProfile viewUserData={viewUser} />);

  it('should render name', () => {
    expect(wrapper.find('h2').text().includes('Tony')).to.equal(true);
  });

  it('should render profile pic', () => {
    expect(wrapper.find('img')).to.have.length(1);
  });

  it('should render bio', () => {
    expect(wrapper.find('.view-profile-bio').text().includes('sugar')).to.equal(true);
  });

  it('should render followers', () => {
    expect(wrapper.find('.view-profile-follower')).to.have.length(2);
  });

  it('should render followees', () => {
    expect(wrapper.find('.view-profile-followee')).to.have.length(2);
  });
});
