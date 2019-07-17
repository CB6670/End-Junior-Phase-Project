import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import logger from "redux-logger";


// actions

const ADD_STUDENT = 'ADD_STUDENT';

const CHANGE_STUDENT = "CHANGE_STUDENT";

const DESTROY_STUDENT = "DESTROY_STUDENT";

const FETCH_SCHOOLS = "FETCH_SCHOOLS";

const FETCH_STUDENTS = "FETCH_STUDENTS";

//action creators

const _addStudent = (student) => (
    {
        type: ADD_STUDENT,
        student
    }
)
const _fetchSchools = (schools) => (
    {
        type: FETCH_SCHOOLS,
        schools
    }
)

const _fetchStudents = (students) => (
    {
        type: FETCH_STUDENTS,
        students
    }
)

const _changeStudent = (schoolId) => (
    {
        type: CHANGE_STUDENT,
        schoolId
    }
)

// thunks

export const addStudent = (dataObj) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/api/students', dataObj);
            console.log("addThunk");
            return dispatch(_addStudent(res.data));
        } catch (err) {
            console.error(err);
        }
    }
}

export const fetchStudents = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/students');
            return dispatch(_fetchStudents(res.data));
        } catch (err) {
            console.error(err);
        }
    }
}

export const fetchSchools = () => {
    return async (dispatch) => {
        try {
            const res = await axios.get('/api/schools');
            console.log("res", res);
            return dispatch(_fetchSchools(res.data));
        } catch (err) {
            console.error(err);
        }
    }
}

export const changeStudent = (schoolId) => {
    return async (dispatch) => {
        const res = await axios.put('/api/students', schoolId)
    }
}

//reducers which are combined by combineReducers

const schoolReducer = (state = {}, action) => {
    switch (action.type) {
        case FETCH_SCHOOLS:
            console.log("inside fetch schools case", { ...state, schoolsList: action.schools })
            return { ...state, schoolsList: action.schools }
        default:
            return state;
    }
}

const studentReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_STUDENT:
            return { ...state, studentsList: [...state.studentsList, action.student] };
        case FETCH_STUDENTS:
            return { ...state, studentsList: action.students }
        case CHANGE_STUDENT: {
            const changedStudents = state.studentsList.map(student => {
                if (student.firstName === action.student.firstName && student.lastName === action.student.lastName) {
                    student = action.student
                }
                return student;
            })
            return { ...state, studentsList: changedStudents }
        }
        default:
            return state
    }
}

const reducer = combineReducers({ schools: schoolReducer, students: studentReducer })

const store = createStore(reducer, applyMiddleware(thunk, logger));

//store.subscribe(() => console.log(store.getState()));

export default store;
