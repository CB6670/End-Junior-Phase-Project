import React, { Component } from 'react';
import { addStudent, fetchSchools } from '../store/store';
import { connect } from "react-redux";


class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            GPA: 0,
            school: 'Harvard',
            loading: true
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        await this.props.loadData();
        //console.log("data", await this.props.loadData());
        this.setState({loading: false});
    }

    handleChange(ev) {
        this.setState({
            [ev.target.name]: ev.target.value
        })
    }

    async handleSubmit(ev) {
        ev.preventDefault();
        const dataObj = {};
        dataObj.firstName = this.state.firstName;
        dataObj.lastName = this.state.lastName;
        dataObj.email = this.state.email;
        dataObj.GPA = this.state.GPA;
        await this.props.addStudentDispatch(dataObj);
        this.setState({ firstName: '', lastName: '', email: '', GPA: 0, school: "Harvard" });
    }
    render() {
        if(this.state.loading){
            return <div></div>;
        }
        const { schools, students } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    first Name:
        <input type='text' name='firstName' onChange={this.handleChange} value = {this.state.firstName} />
                </label>
                <label>
                    last Name:
        <input type='text' name='lastName' onChange={this.handleChange} value = {this.state.lastName} />
                </label>
                <label>
                    Email:
        <input type='email' name='email' onChange={this.handleChange} value = {this.state.email} />
                </label>
                <label>
                    GPA:
        <input type='number' name='GPA' onChange={this.handleChange} value = {this.state.GPA} />
                </label>
                <select value={this.state.value} onChange={this.handleChange} name="school" >
                    {
                        schools.schoolsList.map(school => (<option key = {school.id} value = {school.id}>{school.name}</option>))
                    }
                </select>
                <input type="submit" value="Submit" />
            </form>
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
        loadData: () => dispatch(fetchSchools()),
        addStudentDispatch: (obj) => dispatch(addStudent(obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
