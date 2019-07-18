import React from "react";
import { connect } from "react-redux";


const Home = ({ topGPASchool, avg, topAttendeeSchool, outerAttendees }) => {
    return (
        <div>
            <h1> Welcome to the Home Page!</h1>
            <h2>Our School with the top GPA is {topGPASchool.name} with an average GPA of {avg}</h2>
            <h2>Our School with the most attendees is {topAttendeeSchool.name} with {outerAttendees} attendees</h2>
        </div>
    )
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

        if (attendees > outerAttendees) {
            console.log("attendees", attendees)
            outerAttendees = attendees;
            topAttendeeSchool = school;
        }

        if (addedGPAs / attendees > avg) {
            avg = addedGPAs / attendees;
            topGPASchool = school;
        }
    })
    console.log("attendee school", topAttendeeSchool)
    return {
        topGPASchool,
        avg,
        students,
        topAttendeeSchool,
        outerAttendees
    }
}

export default connect(mapStateToProps)(Home)