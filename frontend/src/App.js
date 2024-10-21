// App.js
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    tasks: [],
    newTask: '',
  };

  componentDidMount() {
    this.fetchTasks();
  }

  fetchTasks = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((response) => {
        this.setState({ tasks: response.data });
      })
      .catch((error) => {
        console.error('Error fetching tasks: ', error);
      });
  }

  addTask = () => {
    axios.post(`${process.env.REACT_APP_API_URL}/tasks`, {
      title: this.state.newTask,
    })
      .then((response) => {
        this.setState({ newTask: '' });
        this.fetchTasks();
      })
      .catch((error) => {
        console.error('Error adding task: ', error);
      });
  }

  updateTask = (id, done) => {
    axios.put(`${process.env.REACT_APP_API_URL}/tasks/${id}`, { done })
      .then(() => {
        this.fetchTasks();
      })
      .catch((error) => {
        console.error('Error updating task: ', error);
      });
  }

  deleteTask = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`)
      .then(() => {
        this.fetchTasks();
      })
      .catch((error) => {
        console.error('Error deleting task: ', error);
      });
  }

  render() {
    return (
      <div className="App">
        <h1>To-Do List</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="New Task"
            value={this.state.newTask}
            onChange={(e) => this.setState({ newTask: e.target.value })}
            style={{ fontSize: '16px', width: '70%' }}
          />
          <button onClick={this.addTask} style={{ fontSize: '16px', width: '10%' }}>
            Add Task
          </button>
        </div>
        <br /> 
        <table className="task-table">
          <thead>
            <tr>
              <th style={{ width: '5%' }}>Status</th>
              <th style={{ width: '85%' }}>Task</th>
              <th style={{ width: '10%' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tasks.map((task) => (
              <tr key={task.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={(e) => this.updateTask(task.id, e.target.checked)}
                  />
                </td>
                <td className={task.done ? 'done' : ''}>{task.title}</td>
                <td>
                  <button onClick={() => this.deleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
