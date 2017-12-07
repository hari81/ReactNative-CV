jest.mock('bugsnag-react-native', () => ({
    Client: jest.fn(),
    Configuration: jest.fn()
}));
jest.mock('react-native-fetch-blob');
jest.mock('react-native-fetch-blob', () => {
    return {
        DocumentDir: () => {},
    };
});
import 'react-native';
import configureStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import React from 'react';
import Loginform from '../src/containers/LoginForm';
import { configure } from 'enzyme';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing strings', () => {
    const initialState = {
            email: '',
            password: '',
            signIn: false,
            saveUser: false,
            auth: {
                loading: false
            }

    };
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Loginform />,
            { context: { store: mockStore(initialState) } }
        );
    });
    it('render snapshot ', () => {
        expect(wrapper.dive()).toMatchSnapshot();
    });
    it('check component', () => {
        expect(wrapper).toBeDefined();
        const render = wrapper.dive();
        render.find('Switch').forEach(child => {
            child.simulate('valueChange');
        });
    });

});
