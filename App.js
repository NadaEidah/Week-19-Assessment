import React, { Component } from 'react';
import axios from 'axios';
import AddTodoItem from './components/AddTodoItem';
import Todos from './components/Todos';

export default class App extends Component {
  state = {
    tasks: [],
    message: 'message from app component',
    title: 'title from app component'
  };

  componentDidMount() {
    axios
      .get('http://localhost:9000/tasks')
      .then(res => {
        const tasks = res.data;
        this.setState({ tasks });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Q2: we have 6 errors here please fix them [6-1, 2,3,4,5,pt]
  // addTodoItem = newTask => {
  //   axios
  //     .get('getTasks')
  //     .then(res => {
  //       const result = res;
  //       this.state.tasks = result;
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

    addTodoItem = item => {
    axios
      .post('http://localhost:9000/addNewTask')
      .then(res => {
        const result = res.data;
        this.setState({result});
      })
      .catch(error => {
        console.log(error);
      });
  };





  toggleComplete = id => {
    axios
      .put(`http://localhost:9000/toggleTask/${id}`)
      .then(res => {
        const tasks = res.data;
        this.setState({ tasks });
      })
      .catch(error => {
        console.log(error);
      });
  };

  deleteItem = id => {
    axios
      .delete(`http://localhost:9000/tasks/${id}`)
      .then(res => {
        const tasks = res.data;
        this.setState({ tasks });
      })
      .catch(error => {
        console.log(error);
      });
  };
  render() {
    const { addTodoItem, toggleComplete, deleteItem } = this;
    const { tasks, message, title } = this.state;
    return (
      <React.Fragment>
        <AddTodoItem addTodoItem={addTodoItem} />
        <Todos
          tasks={tasks}
          toggleComplete={toggleComplete}
          deleteItem={deleteItem}
        />
      </React.Fragment>
    );
  }
}
