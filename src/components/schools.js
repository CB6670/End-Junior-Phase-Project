import React,{Component} from "react";
import axios from "axios";

const Schools = async() => {
    const res = await axios.get("/api/schools");
    const schools = res.data;
    return(
        <ul>
            {
                schools.map(school => <li key = {school.id}>{school.name}</li>)
            }
        </ul>
    )
}

export default Schools;