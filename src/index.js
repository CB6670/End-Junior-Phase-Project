import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/store';
import App from './components/App';
import {HashRouter} from 'react-router-dom';

const root = document.getElementById('root');

render(<Provider store = {store}><HashRouter><App /></HashRouter></Provider>, root);

const mapper = ({schools, students}) => {
    const schoolsMap = students.reduce((acc, student) => {
        if (!acc[student.schoolId]){
            acc[student.schoolId] = [];
        }
        acc[student.schoolId].push(student);
        return acc;
    }, {})
    return {
        schools,
        schoolsMap
    }
}
export default mapper;
