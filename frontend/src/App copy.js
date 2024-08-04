import React, { Component } from "react";
import Navbar from "./components/Navbar";  // Import Navbar
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: [],
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
        due_date: "",
        notifications_enabled: false,
      },
      user: null, // State to hold user info
    };
  }

  componentDidMount() {
    this.refreshList();
    this.getUser();
  }

  getUser = () => {
    // Fetch user info
    axios
      .get("/api/user/")
      .then((res) => this.setState({ user: res.data }))
      .catch((err) => console.log(err));
  };

  handleLogout = () => {
    axios
      .post("/api/logout/")
      .then(() => {
        this.setState({ user: null });
        // Redirect or update state after logout
      })
      .catch((err) => console.log(err));
  };

  refreshList = () => {
    axios
      .get("/api/todos/")
      .then((res) => this.setState({ todoList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`/api/todos/${item.id}/`, item)
        .then((res) => this.refreshList())
        .catch((err) => console.log(err));
      return;
    }
    axios
      .post("/api/todos/", item)
      .then((res) => this.refreshList())
      .catch((err) => console.log(err));
  };

  handleDelete = (item) => {
    axios
      .delete(`/api/todos/${item.id}/`)
      .then((res) => this.refreshList())
      .catch((err) => console.log(err));
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false, due_date: "", notifications_enabled: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    this.setState({ viewCompleted: status });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "nav-link active" : "nav-link"}
        >
          Complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "nav-link" : "nav-link active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      (item) => item.completed === viewCompleted
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <div className="d-flex flex-column">
          <span
            className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`}
            title={item.description}
          >
            {item.title}
          </span>
          {item.due_date && (
            <small className="text-muted">
              Due: {new Date(item.due_date).toLocaleDateString()} {new Date(item.due_date).toLocaleTimeString()}
            </small>
          )}
          <small className="text-muted">
            Notifications: {item.notifications_enabled ? "Enabled" : "Disabled"}
          </small>
        </div>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <Navbar user={this.state.user} onLogout={this.handleLogout} />
        <h1 className="text-white text-uppercase text-center my-4">Todo App</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button className="btn btn-primary" onClick={this.createItem}>Add Task</button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;
