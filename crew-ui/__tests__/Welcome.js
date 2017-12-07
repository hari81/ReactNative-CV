jest.mock('bugsnag-react-native');
jest.mock('react-native-fetch-blob');
jest.mock('react-native-fetch-blob', () => {
    return {
        DocumentDir: () => {},
        polyfill: () => {},
    };
})
import 'react-native';
import { shallow } from 'enzyme';
import React from 'react';
import Welcome from '../src/components/Welcome';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

configure({ adapter: new Adapter() });

describe('Testing strings', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Welcome />,
            { context: { store: mockStore() } });
    });
    it('render snapshot ', () => {
        expect(wrapper).toMatchSnapshot();
    })

    it('check component', () => {
        expect(wrapper).toBeDefined();
    });
    it('Welcome text check', () => {
        expect(wrapper.contains('Welcome')).toBe(true);
    });
    it('Login below text check', () => {
        expect(wrapper.contains('Login below')).toBe(true);
    });
    it('Cargill Website text check', () => {
        expect(wrapper.contains('Cargill Website |  ')).toBe(true);
    });
    it('Privacy text check', () => {
        expect(wrapper.contains('Privacy')).toBe(true);
    });
    it('Terms & Conditions text check', () => {
        expect(wrapper.contains('Terms & Conditions')).toBe(true);
    });
    it('Price Hedging text check', () => {
        expect(wrapper.contains('Price Hedging')).toBe(true);
    });
});
