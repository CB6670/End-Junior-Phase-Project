import React, {Component} from 'react';
import store, {addStudent} from '../store/store';

export default class Form extends Component{
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            GPA: 0,
            school: ''
         }
         this.handleSubmit = this.handleSubmit.bind(this);
         this.handleChange = this.handleChange.bind(this);
    }
    handleChange(ev){
        const target = ev.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
        //console.log(this.state);
    }

    handleSubmit(ev){
        ev.preventDefault();
        const firstName = ev.target.firstName;
        const lastName = ev.target.lastName;
        const email = ev.target.lastName;
        const GPA = ev.target.GPA;
        const school = this.state.store.schools.filter( _school => {
            if (school.name === ev.target.school){
                return _school;
            }
        });
        const schoolId = school.id;
        //console.log(this.state.store);
        store.dispatch(addStudent(firstName, lastName, email, GPA, schoolId));
        this.setState({firstName: '', lastName: '', email: '', GPA: 0, school: ''});
    }
    render(){
        return(<form onSubmit = {this.handleSubmit}>
<label>
    first Name:
    <input type = 'text' name = 'firstName' onChange = {this.handleChange} />
</label>
<label>
    last Name:
    <input type = 'text' name = 'lastName' onChange = {this.handleChange} />
</label>
<label>
    Email:
    <input type = 'email' name = 'email' onChange = {this.handleChange} />
</label>
<label>
    GPA:
    <input type = 'number' name = 'GPA' onChange = {this.handleChange} />
</label>
<select value={this.state.school} onChange={this.handleChange} name = "school">
    <option defaultValue="Not Enrolled">Not Enrolled</option>
    <option value="Harvard">Harvard</option>
    <option value="Yale">Yale</option>
    <option value="UCLA">UCLA</option>
</select>
<input type = "submit" value = "Submit" />
</form>
        )
    }
}