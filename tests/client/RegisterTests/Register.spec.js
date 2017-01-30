import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
// import Register from '../../../../src/client/components';

describe('Component: <Register />', () => {
  const shallowWrapper = shallow(<Register />);
  const mountedWrapper = mount(<Register />);

  it('should have five input boxes and one button', () => {
    expect(shallowWrapper.find('input')).to.have.length(5);
    expect(shallowWrapper.find('button')).to.have.length(1);
  });

  it('should have props of registerUser, isPending, and isLoggedIn', () => {
    expect(shallowWrapper.props().registerUser).to.be.a.function;
    expect(shallowWrapper.props().isPending).to.be.a.boolean;
    expect(shallowWrapper.props().isLoggedIn).to.be.a.boolean;
  });

  it('should update isPending on click', () => {
    mountedWrapper.find('button').simulate('click');
    expect(mountedWrapper.props().isPending).to.be.true;
  });
});
