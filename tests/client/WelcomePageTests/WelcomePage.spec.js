import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

describe('Component: <WelcomePage />', () => {
  const shallowWrapper = shallow(<WelcomePage />);
  const mountedWrapper = mount(<WelcomePage />);

  it('should have two images, one text div, and two buttons', () => {
    expect(shallowWrapper.find('img')).to.have.length(2);
    expect(shallowWrapper.find('div')).to.have.length(1);
    expect(shallowWrapper.find('button')).to.have.length(2);
  });

  it('should have props of loginUser and registerUser', () => {
    expect(shallowWrapper.props().loginUser).to.be.a.function;
    expect(shallowWrapper.props().registerUser).to.be.a.function;
  });

  it('should route to login page on click', () => {
    mountedWrapper.find('button')[0].simulate('click');
    expect(mountedWrapper.props().loginUser).to.be.true;
  });

  it('should route to register page on click', () => {
    mountedWrapper.find('button')[1].simulate('click');
    expect(mountedWrapper.props().registerUser).to.be.true;
  });
});
