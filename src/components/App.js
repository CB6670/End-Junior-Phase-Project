import React, {Component} from "react";
import {Route, Link} from "react-router-dom";
import {connect} from "react-redux";
import store, {addStudent} from '../store/store';
import Form from './Form';
import Home from './Home';


const App = (props) => {
    return(
        <div>
            <Link to = "/">Acme Schools</Link>
            <Link to = "/schools">Schools</Link>
            <Link to = "/students">Students</Link>
            <Route component = {Form} />
            <Route exact path = "/" component = {Home} />
        </div>
    )
}

export default connect()(App);