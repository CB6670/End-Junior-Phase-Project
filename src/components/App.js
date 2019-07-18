import React, {Component} from "react";
import {Route, Link} from "react-router-dom";
import {connect} from "react-redux";
import store, {addStudent, fetchSchools, fetchStudents} from '../store/store';
import Form from './Form';
import Home from './Home';
import Schools from './schools';
import Students from './students';
import Student from "./student"
import School from "./School";


class App extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.loadData()
    }
    render(){
        const {topGPASchool, topAttendeeSchool} = this.props;
        if (!topGPASchool){
            return null;
        }
        return (
            <div>
                <Link to = "/">Acme Schools</Link>
                <Link to = "/schools">Schools</Link>
                <Link to = "/students">Students</Link>
                <Link to = {`/schools/${topGPASchool.id}`}>Top GPA School: {topGPASchool.name}</Link>
                <Link to = {`/schools/${topAttendeeSchool.id}`}>School With Top Attendees: {topAttendeeSchool.name}</Link>
                <Route component = {Form} />
                <Route exact path = "/" component = {Home} />
                <Route exact path = "/schools" component = {Schools} />
                <Route exact path = "/students" component = {Students} />
                <Route path = "/students/:id" component = {Student} />
                <Route path = "/schools/:id" component = {School} />
            </div>
        )
    }
}

const mapStateToProps = ({ schools, students }) => {
    let topGPASchool;
    let avg = 0;
    let topAttendeeSchool;
    let outerAttendees = 0;
    schools.schoolsList.map((school) => {
        let attendees = 0
        let addedGPAs = 0
        students.studentsList.map(student => {
            if (student.schoolId === school.id) {
                attendees++;
                addedGPAs = addedGPAs + student.GPA * 1;
            }
        })

        if (attendees > outerAttendees){
            console.log("attendees", attendees)
            outerAttendees = attendees;
            topAttendeeSchool = school;
        }

        if (addedGPAs / attendees > avg){
            avg = addedGPAs / attendees;
            topGPASchool = school;
        }
    })
    console.log("attendee school",topAttendeeSchool)
    return {
        topGPASchool,
        avg,
        students,
        topAttendeeSchool
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        loadData: () => {
            dispatch(fetchSchools());
            dispatch(fetchStudents());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);