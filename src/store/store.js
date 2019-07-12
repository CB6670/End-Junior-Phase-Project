import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";

const ADD_STUDENT = 'ADD_STUDENT';

const CHANGE_SCHOOL = "CHANGE_SCHOOL";

const DESTROY_STUDENT = "DESTROY_STUDENT";

const schoolReducer = (store = [], action) => {
    switch(action.type){
        case CHANGE_SCHOOL:
            return [...store, action.id]
        default:
            return store;
    }
}

const studentReducer = (store = [], action) => {
    switch(action.type){
        case ADD_STUDENT:
            return [...store, action.id]
        default:
            return store
    }
}

const reducer = combineReducers({schools: schoolReducer , students: studentReducer})

const store = createStore(reducer, applyMiddleware());

store.subscribe(() => console.log(store.getState()));

export default store;
