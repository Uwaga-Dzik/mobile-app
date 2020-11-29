const initialState = {
  lng: 0,
  lat: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `NAVIGATE_TO_REGION`: {
      return action.payload;
    }
    default:
      return state;
  }
};
