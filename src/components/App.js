import React from "react";
import {Route} from "react-router-dom";

const App = (props) => {
    return(
        <Route exact path = "/" component = {Home} />
    )
}