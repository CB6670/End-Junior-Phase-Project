import React, {Component} from 'react';
import {connect} from "react-redux";
import { fetchStudent } from '../store/store';


class Student extends Component{
    async componentDidMount(){
        console.log(this.props)
        this.props.loadStudent(this.props.match.params.id)
    }
    render(){
        return <div> </div>
    }
}

const mapStateToProps = ({schools, students}) => {
    return {
        schools,
        students
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadStudent: (id) => {
            dispatch(fetchStudent(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Student);
