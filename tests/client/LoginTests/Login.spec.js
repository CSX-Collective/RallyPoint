import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
// import Login from '../../../../src/client/components';

describe('Component: <Login />', () => {
  const shallowWrapper = shallow(<Login />);
  const mountedWrapper = mount(<Login />);

  it('should have two input boxes and three buttons', () => {
    expect(shallowWrapper.find('input')).to.have.length(2);
    expect(shallowWrapper.find('button')).to.have.length(3);
  });

  it('should have props of loginUser, isPending, and isLoggedIn', () => {
    expect(shallowWrapper.props().loginUser).to.be.a.function;
    expect(shallowWrapper.props().isPending).to.be.a.boolean;
    expect(shallowWrapper.props().isLoggedIn).to.be.a.boolean;
  });

  it('should update isPending on click', () => {
    mountedWrapper.find('button')[0].simulate('click');
    expect(mountedWrapper.props().isPending).to.be.true;
  });
});
