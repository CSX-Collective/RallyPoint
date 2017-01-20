import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
// import Register from '../../../../src/client/components';

describe('Component: <Register/>', () => {
  it('should have five input boxes and one button', () => {
    const wrapper = shallow(<Register/>);
    expect(wrapper.find('input')).to.have.length(5);
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('should have props of registerUser, isPending, and isLoggedIn', () => {
    const wrapper = shallow(<Register/>);
    expect(wrapper.props().registerUser).to.be.a.function;
    expect(wrapper.props().isPending).to.be.a.boolean;
    expect(wrapper.props().isLoggedIn).to.be.a.boolean;
  });

  it('should update isPending on click', () => {
    const wrapper = shallow(<Register/>);
    wrapper.find('button').simulate('click');
    expect(wrapper.props().isPending).to.be.true;
  });
});
