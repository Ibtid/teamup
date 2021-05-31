export const initialState = {
  project: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECTED_PROJECT':
      return {
        ...state,
        project: action.project,
      };
    default:
      return state;
  }
};

export default reducer;
