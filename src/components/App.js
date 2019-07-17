import React, {Component} from "react";
import {Route, Link} from "react-router-dom";
import {connect} from "react-redux";
import store, {addStudent, fetchSchools, fetchStudents} from '../store/store';
import Form from './Form';
import Home from './Home';
import Schools from './schools';
import Students from './students';


class App extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.loadData()
    }
    render(){
        const {schools, students} = this.props
        return(
            <div>
                <Link to = "/">Acme Schools</Link>
                <Link to = "/schools">Schools</Link>
                <Link to = "/students">Students</Link>
                <Route component = {Form} />
                <Route exact path = "/" component = {Home} />
                <Route exact path = "/schools" component = {Schools} />
                <Route path = "/students" component = {Students} />
            </div>
        )
    }
}

const mapStateToProps = ({schools, students}) => {
    return{
        schools,
        students
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