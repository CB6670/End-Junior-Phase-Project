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

const FETCH_STUDENT = "FETCH_STUDENT";

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

const _changeStudent = (changedStudent) => (
    {
        type: CHANGE_STUDENT,
        changedStudent
    }
)

const _fetchStudent = (studentId) => (
    {
        type: FETCH_STUDENT,
        studentId
    }
)

const _deleteStudent= (studentId) => (
    {
        type: DESTROY_STUDENT,
        studentId
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

export const changeStudent = (schoolId, studentId) => {
    return async (dispatch) => {
        console.log("schoolId",schoolId);
        console.log("studentId", studentId);
        const res = await axios.put(`/api/students/${studentId}`, {schoolId});
        console.log("inside changeStudent",res.data);
        dispatch(_changeStudent(res.data));
    }
}

export const fetchStudent = (studentId) => {
    return async (dispatch) => {
        const res = await axios.get(`/api/students/${studentId}`);
        return dispatch(_fetchStudent);
    }
}

export const deleteStudent = (studentId) => {
    console.log("inside deleteStudent thunk")
    return async (dispatch) => {
        const res = await axios.delete(`/api/students/${studentId}`, studentId);
        console.log("response data:", res.data);
        return dispatch(_deleteStudent(res.data));
    }
}

//reducers which are combined by combineReducers

const schoolReducer = (state = {schoolsList: []}, action) => {
    switch (action.type) {
        case FETCH_SCHOOLS:
            console.log("inside fetch schools case", { ...state, schoolsList: action.schools })
            return { ...state, schoolsList: action.schools }
        default:
            return state;
    }
}

const studentReducer = (state = {studentsList: []}, action) => {
    switch (action.type) {
        case ADD_STUDENT:
            return { ...state, studentsList: [...state.studentsList, action.student] };
        case FETCH_STUDENTS:
            return { ...state, studentsList: action.students }
        case CHANGE_STUDENT: {
            const changedStudents = state.studentsList.map(student => {
                if (student.id === action.changedStudent.id) {
                    student = action.changedStudent
                }
                return {...state, studentsList: changedStudents};
            })
            return { ...state, studentsList: changedStudents }
        }
        case DESTROY_STUDENT: {
            const newStudents = state.studentsList.filter(student => {
                if (student.id !== action.studentId){
                    return student;
                }
            })
            return {...state, studentsList: newStudents}
        }
        default:
            return state
    }
}

const reducer = combineReducers({ schools: schoolReducer, students: studentReducer })

const store = createStore(reducer, applyMiddleware(thunk, logger));

//store.subscribe(() => console.log(store.getState()));

export default store;
