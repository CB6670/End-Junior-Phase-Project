import React, { Component } from "react";
import { fetchStudents, deleteStudent, changeStudent } from '../store/store';
//import mapper from '../index';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Student extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            loading: true,
            selectedSchool: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
    }

    async componentDidMount(){
        await this.props.loadData();
        console.log("students", await this.props.loadData);
        this.setState({loading:false});
    }

    async deleteStudent(id){
        await this.props.destroyStudent(id)
    }

    async handleChange(ev, studentsId){
        console.log("etv", ev.target.value);
        this.setState({[ev.target.name]: ev.target.value});
        await this.props.changeStudent(ev.target.value, studentsId);
    }

    render() {
        if (this.state.loading){
            return <div> </div>
        }
        const { students, schools } = this.props;
        return (
            students && students.studentsList.map(student => (
                <div key={student.id}>
                    <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>
                    <button key = {student.id} onClick = {() => this.deleteStudent(student.id)}>Delete</button>
                    <form onSubmit={this.handleSubmit}>
                        <select onChange={(ev) => this.handleChange(ev, student.id)}>
                            {
                                schools.schoolsList.map(school => {
                                    
                                    return <option name = {school.name} key={school.id} value={school.id}  selected = {school.id === student.schoolId ? true: false}>{school.name}</option>
                                })
                            }
                        </select>
                    </form>
                </div>
            ))
        )
    }
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
            dispatch(fetchStudents());
        },
        destroyStudent: (id) => {
            dispatch(deleteStudent(id));
        },
        changeStudent: (schoolId, studentId) => {
            dispatch(changeStudent(schoolId, studentId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);
