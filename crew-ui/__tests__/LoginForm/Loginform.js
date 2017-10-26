import 'react-native';
import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Welcome from '../../src/components/Welcome';
//import bugsnag from '../../src/components/common/BugSnag';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

//jest.mock('clearSomethingInModal', () => jest.fn(bugsnag))

describe('Welcome', () => {
    it('Welcome renders hello world', () => {
        const welcome = shallow(<Welcome />);
        expect(welcome.find('Text').text()).toEqual('Welcome');
    });
});