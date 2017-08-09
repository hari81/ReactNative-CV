export default (state = "", action) => {
  switch (action.type) {
    case "DASHBOARD_OPEN_POSITIONS_COUNT":
      return action.openPositionsCount;
    default:
      return state;
  }
};
