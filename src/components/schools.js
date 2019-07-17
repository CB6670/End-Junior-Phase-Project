import React, {Component} from 'react';
import store, {addStudent, fetchSchools} from '../store/store';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Schools extends Component{
    componentDidMount(){
        this.props.loadData();
    }

    render(){
        const {schools} = this.props;
        return (
            <div>
                {
                    schools.schoolsList.map(school => (
                        <div key = {school.id}>
                            <Link to = {`/schools/${school.id}`} >{school.name}</Link>
                            <img src = {school.imageURL} />
                            <p>Student Count: {school.studentCount}</p>
                        </div>
                    ))
                }
            </div>
        )
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
        loadData: () => {
            dispatch(fetchSchools());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schools);
