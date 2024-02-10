
const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const SET_TODOS = 'SET_TODOS';
const ID_TOBE_SEARCHED = 'ID_TOBE_SEARCHED';

const initialState = {
  todos: [],
  idTobeSearched: undefined
}

const todoReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_TODOS: return {
      todos: action.payload
    }

    case ADD_TODO: return {
      todos: [...state.todos, action.payload]
    }

    case DELETE_TODO: return {
      todos: state.todos.filter(todo => todo.id !== action.payload)
    }

    case ID_TOBE_SEARCHED: return {
      ...state,
      idTobeSearched: state.todos.filter(todo => todo.id === parseInt(action.payload,10))
    }

    default: return state

  }

}

export default todoReducer;
