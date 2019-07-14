import React, {Component} from "react";
import store from "../store/store";

export default class Student extends Component{
    constructor(props){
        super(props);
        this.state = store.getState();
    }

    render(){
        const {students, schools} = this.state;
        return (
            students.map(student => (
                <div>
                    
                </div>
            ) )
        )
    }
}

