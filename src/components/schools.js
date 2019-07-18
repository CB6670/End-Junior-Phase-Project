import React from 'react';
import { changeStudent, fetchSchools, fetchStudents } from '../store/store';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Schools = ({ schools, students, updateStudent, loadData }) => {
    console.log("schools", schools)
    if (!schools || !students){
        console.log("none!")
        loadData();
        return null;
    }
    let count = 0;

    return (
        <div>
            {
                schools && schools.schoolsList.map(school => {
                    count = 0
                    return (
                        <div key={school.id}>
                            <Link to={`/schools/${school.id}`} >{school.name}</Link>
                            <img src={school.imageURL} />
                            {
                                students.studentsList.map(student => {
                                    if (student.schoolId === school.id) {
                                        count++
                                    }
                                })
                            }
                            <p>Attendees: {count}</p>
                            <form >
                                <select onChange={(ev) => updateStudent(school.id, ev.target.value)}>
                                    <option value="">Add Student</option>
                                    {
                                        students.studentsList.map(student => <option key={student.id} value={student.id}>{student.firstName} {student.lastName}</option>)
                                    }
                                </select>
                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                    )
                })
            }
        </div>
    )
}

const mapStateToProps = ({ schools, students }) => {
    return {
        schools,
        students
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadData: () => {
            dispatch(fetchSchools());
            dispatch(fetchStudents());
        },
        updateStudent: (schoolId, studentId) => {
            dispatch(changeStudent(schoolId, studentId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schools);
