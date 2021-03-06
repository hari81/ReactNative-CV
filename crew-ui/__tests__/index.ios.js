jest.mock('bugsnag-react-native');
jest.mock('react-native-fetch-blob');
jest.mock('react-native-fetch-blob', () => {
    return {
        DocumentDir: () => {}
    };
});
import 'react-native';
import configureStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import React from 'react';
import Index from '../src/App';
import { configure } from 'enzyme';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing strings', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Index />,
            { context: { store: mockStore() } }
        );
    });
    it('render snapshot ', () => {
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('check component', () => {
        expect(wrapper).toBeDefined();
    });
});
