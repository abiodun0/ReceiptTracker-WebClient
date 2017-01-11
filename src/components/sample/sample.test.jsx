import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
// import sinon from 'sinon';
import Sample from './sample';

describe('Sample Component', () => {
  it('should have the content', () => {
    const sample = shallow(<Sample />);
    expect(sample.text()).to.contain('This is a sample Component Test Button');
  });
  it('should trigger checkTest event on button click', () => {
    sinon.spy(Sample.prototype, 'checkTest');
    const sample = mount(<Sample />);
    sample.find('button').simulate('click');
    expect(Sample.prototype.checkTest.calledOnce).to.equal(true);
  });
  it('should have initial states set', () => {
    const sample = mount(<Sample />);
    expect(sample.state('testState')).to.equal('this are sample data');
  });
  it('should have initial props set', () => {
    const sample = mount(<Sample testProps="this are test props" />);
    expect(sample.props().testProps).to.equal('this are test props');
  });
});
