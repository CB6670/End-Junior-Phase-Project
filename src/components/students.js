import React, { Component } from "react";
import store, { fetchSchools, fetchStudents } from "../store/store";
import mapper from '../index';
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
    }

    async componentDidMount(){
        await this.props.loadData();
        console.log("students", await this.props.loadData);
        this.setState({loading:false})
    }

    async componentDidUpdate(prevProps){
        console.log("prevProps",prevProps);
        console.log("props", this.props);
        if(prevProps.students.studentsList !== this.props.students.studentsList){
            
        }
    }

    handleChange(ev){
        console.log("etv", ev.target.value);
        this.props.changeStudent(ev.target.value);
    }

    render() {
        if (this.state.loading){
            return <div> </div>
        }
        const { students, schools } = this.props;
        return (
            students.studentsList.map(student => (
                <div key={student.id}>
                    <Link to={`/students/${student.id}`}>{student.firstName} {student.lastName}</Link>

                    <form onSubmit={this.handleSubmit}>
                        <select value = {this.state.selectedSchool} onChange={this.handleChange}>
                            {
                                schools.schoolsList.map(school => {
                                    if (school.id === student.schoolId){
                                        return (<option key = {school.id}>{school.name}</option>)
                                    }
                                    return <option key={school.id} value={school.id} >{school.name}</option>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);
