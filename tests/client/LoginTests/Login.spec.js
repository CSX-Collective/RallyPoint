import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
// import Login from '../../../../src/client/components';

describe('Component: <Login />', () => {
  it('should have two input boxes and three buttons', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('input')).to.have.length(2);
    expect(wrapper.find('button')).to.have.length(3);
  });

  it('should have props of loginUser, isPending, and isLoggedIn', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.props().loginUser).to.be.a.function;
    expect(wrapper.props().isPending).to.be.a.boolean;
    expect(wrapper.props().isLoggedIn).to.be.a.boolean;
  });

  it('should update isPending on click', () => {
    const wrapper = mount(<Login />);
    wrapper.find('button')[0].simulate('click');
    expect(wrapper.props().isPending).to.be.true;
  });
});
