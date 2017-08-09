export default (state = "", action) => {
  switch (action.type) {
    case "DASHBOARD_OPEN_WORKING_ORDERS_COUNT":
      return action.openWorkingOrders;
    default:
      return state;
  }
};
