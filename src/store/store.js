import {createStore} from "redux";
import {CHANGE_SCHOOL, ADD_STUDENT} from "./actions";

const reducer = (store = [], action) => {
    switch(action.type){
        case CHANGE_SCHOOL:
            return [...store,action.id]
        default:
            return store;
    }
}

const store = createStore(reducer);

export default store;
