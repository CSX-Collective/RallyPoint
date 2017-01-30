import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
// import Map from '../../../../src/client/components';

describe('Component: <Map />', () => {
  const shallowWrapper = shallow(<Map />);
  // const mountedWrapper = mount(<Map />);

  it('should have two divs, a Search component, and a ReactFauxDom node', () => {
    expect(shallowWrapper.find('div')).to.have.length(2);
    expect(shallowWrapper.find('.map-search')).to.have.length(1);
    expect(shallowWrapper.find('.react-faux-dom')).to.have.length(1);
  });

  it('should have props of fetchEvents, selectEvent, rallypoints, keywords, selectedRallypoint, and range', () => {
    expect(shallowWrapper.props().fetchEvents).to.be.a.function;
    expect(shallowWrapper.props().selectEvent).to.be.a.function;
    expect(shallowWrapper.props().rallypoints).to.be.an.array;
    expect(shallowWrapper.props().keywords).to.be.an.array;
    expect(shallowWrapper.props().selectedRallypoint).to.be.an.object;
    expect(shallowWrapper.props().range).to.be.a.number;
  });
});
