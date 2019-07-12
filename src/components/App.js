import React, {Component} from "react";
import {Route, Link} from "react-router-dom";
import store from '../store/store';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
           store: store.getState(),
           firstName:'',
           lastName:'',
           email:'',
           GPA:0,
           school: 'Not Enrolled'
        }
    }

    render(){
        return(
        <div>
            <Link to= '/'>Acme Schools</Link>
            <Link to= '/schools'>Schools</Link>
            <Link to= '/students'>Students</Link>
            {}
            <form onSubmit = {handleSubmit}>
                <label>
                    first Name:
                    <input type = 'text' name = 'firstName'/>
                </label>
                <label>
                    last Name:
                    <input type = 'text' name = 'lastName'/>
                </label>
                <label>
                    Email:
                    <input type = 'email' name = 'email'/>
                </label>
                <label>
                    GPA:
                    <input type = 'number' name = 'GPA'/>
                </label>
                <select value={this.state.school} onChange={this.handleSelectChange}>
                    <option value="Harvard">Harvard</option>
                    <option value="Yale">Yale</option>
                    <option selected value="Duke">Duke</option>
                    <option value="UCLA">UCLA</option>
                </select>
            </form>
            {/* <Route path = '/students' component = {Students} />
            <Route exact path = '/schools' component = {Schools} />
            <Route exact path = "/" component = {Home} /> */}
        </div>
        )
    }
}

export default App;