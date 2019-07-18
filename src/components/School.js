import React from "react";
import {connect} from "react-redux";
import {fetchSchools, fetchStudents, changeStudent} from "../store/store";
import {Link} from "react-router-dom";

const School = ({school, attendees, changeStudent, schools}) => {
    if(!school){
        return null
    }
    return (
        <div>
            <h1>{school[0].name}</h1>
            <h2>Attendees({attendees.length}):</h2>
            <ul>
                {
                    attendees.map( attendee => {
                       return (
                           <div key = {attendee.id}>
                               <Link to = {`/students/${attendee.id}`}>{attendee.firstName} {attendee.lastName}</Link>
                               <img src = {school[0].imageURL} />
                               <form>
                                   <select onChange = {(ev) => changeStudent(ev.target.value, attendee.id)}>
                                       {
                                           schools.schoolsList.map( schl => <option key = {schl.id} value = {schl.id} selected = {schl.id === attendee.schoolId ? true: false}>{schl.name}</option> )
                                       }
                                   </select>
                               </form>
                           </div>
                       )
                    })
                }
            </ul>
        </div>
    )
}

const mapStateToProps = ({schools, students}, {match}) => {
    const school = schools.schoolsList.filter( schl => schl.id === match.params.id);
    const attendees = students.studentsList.filter( student => {
        if (student.schoolId === school[0].id){
            return student;
        }
    })
    return {
        school,
        schools,
        attendees,
        students
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: () => {
            dispatch(fetchSchools());
            dispatch(fetchStudents());
        },
        changeStudent: (schoolId, studentId) => {
            dispatch(changeStudent(schoolId, studentId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(School);
