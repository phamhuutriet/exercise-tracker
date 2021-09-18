import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <Link to={`/edit/${props.exercise._id}`}>edit</Link> | <a href="#" onClick={() => props.deleteExercise(props.exercise._id)}>delete</a>
    </td>
  </tr>
)


export class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = {
      exercise: [],
    };
  }

  // Render once at the beginning and update all exercises into a list
  componentDidMount() {
    axios
      .get("https://secure-river-28564.herokuapp.com/exercises")
      .then((res) => {
        this.setState({ exercise: res.data });
      })
      .catch((err) => console.log(err));
  }

  deleteExercise(id) {
    axios
      .delete("https://secure-river-28564.herokuapp.com/exercises")
      .then((res) => console.log(res.data));

    this.setState({
      exercise: this.state.exercise.filter((ele) => ele._id !== id), // Because in DB, the id of each ele is "_id"
    });
  }

  exercisesList() {
    return this.state.exercise.map(curExercise => {
      return <Exercise exercise={curExercise} deleteExercise={this.deleteExercise} key={curExercise._id} />
    })
  }

  render() {
    return (
    <div>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.exercisesList()}
        </tbody>
      </table>
    </div>
  )}
}

export default ExercisesList;
