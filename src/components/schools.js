import React, {Component} from "react";
import axios from "axios";
import store from "../store/store";

class Schools extends Component{
    constructor(props){
        super(props);
        this.state = store.getState();
    }

    render(){
        const {schools} = this.state;
        return (
            {
                schools.map(school => {
                    <div>
                        <h2>{school.name}</h2>
                        <a href = school.imageURL />
                        <p>Student Count: {schoolsMap.length}</p>
                    </div>
                })
            }
        )
    }
}