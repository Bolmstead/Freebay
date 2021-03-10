export default function rootReducer(state = [], action) {
  switch (action.type) {

    case "GET_CURRENT_USER":
      return ([...action.titles]);

    default:
      return state;
  }
}
