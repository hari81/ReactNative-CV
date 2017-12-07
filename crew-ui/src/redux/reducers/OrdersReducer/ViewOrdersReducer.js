import {
  FETCHING_ORDERS_ACTIVITY,
  DROP_DOWN_VALUES,
  CROP_DROPDOWN_LOAD,
  ITEMS_FETCH_DATA_SUCCESS,
  OPEN_POSITIONS_DATA_SUCCESS,
  CLOSED_POSITIONS_DATA_SUCCESS,
  SEGMENT_TAB_SELECT
} from '../../actions/types';

const INITIAL_STATEORDERS = {
  fetchflag: false,
  items: {},
  dropDownData: [],
  selectedSegmentTab: '',
  async: ''
};

export default function (state = INITIAL_STATEORDERS, action) {
  switch (action.type) {
    case ITEMS_FETCH_DATA_SUCCESS:
      return Object.assign({}, state, {
        items: action.items,
        fetchflag: false,
        async: 'success'
      });

    case FETCHING_ORDERS_ACTIVITY:
      return Object.assign({}, state, { fetchflag: true });
    case DROP_DOWN_VALUES:
      return Object.assign({}, state, { dropDownData: action.payload });
    case CROP_DROPDOWN_LOAD:
      return Object.assign({}, state, { items: action.payload });
    case OPEN_POSITIONS_DATA_SUCCESS:
      return Object.assign({}, state, { fetchflag: false });
    case CLOSED_POSITIONS_DATA_SUCCESS:
        return Object.assign({}, state, { fetchflag: false });
    case SEGMENT_TAB_SELECT:
        return Object.assign({}, state, { selectedSegmentTab: action.payload });
    default:
      return state;
  }
}
