// reducers/hostingReducer.js

const initialState = {
    hostingData: [],
    loading: false,
    error: null
  };

  
  const hostingReducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_HOSTING_INFO":
        return { ...state, loading: true };
      case "FETCH_HOSTING_INFO_SUCCESS":
        return { ...state, loading: false, hostingData: action.payload };
      case "FETCH_HOSTING_INFO_FAIL":
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default hostingReducer;
  