export const initialState = {
  project: {},
  user: {},
  boards: [],
  allUsers: [],
  tasks: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        user: action.user,
      };
    case 'SELECTED_PROJECT':
      return {
        ...state,
        project: action.project,
      };
    case 'RETRIEVED_BOARDS':
      return {
        ...state,
        boards: action.boards,
      };
    case 'RETRIEVED_TASKS':
      return {
        ...state,
        boards: action.tasks,
      };
    case 'UPDATE_ALL_USERS':
      return {
        ...state,
        allUsers: action.allUsers,
      };
    default:
      return state;
  }
};

export default reducer;
