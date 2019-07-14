import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import axios from "axios";


// actions

const ADD_STUDENT = 'ADD_STUDENT';

const CHANGE_SCHOOL = "CHANGE_SCHOOL";

const DESTROY_STUDENT = "DESTROY_STUDENT";

//action creators

const _addStudent = (student) => (
    {
        type: ADD_STUDENT,
        student
    }
)

// thunks

export const addStudent = (firstName, lastName, email, GPA, schoolId) => {
    return async (dispatch) => {
        const studentObj = {};
        studentObj.firstName = firstName;
        studentObj.lastName = lastName;
        studentObj.email = email;
        studentObj.GPA = GPA;
        studentObj.schoolId = schoolId;
        const res = await axios.post( '/api/students', studentObj);
        return dispatch(_addStudent(res.data));
    }
}

//reducers which are combined by combineReducers

const schoolReducer = (state = [], action) => {
    switch(action.type){
        default:
            return state;
    }
}

const studentReducer = (state = [], action) => {
    switch(action.type){
        case ADD_STUDENT:
            //  console.log([...state, action.student ])
            return [...state, action.student ];
        default:
            return state
    }
}

const reducer = combineReducers({schools: schoolReducer, students: studentReducer})

const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

export default store;
