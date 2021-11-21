import React, { Component } from 'react';
import Form from './Form.js';


export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      title: '',
      author: '',
      category: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const inputValue = event.target.value;
    const stateField = event.target.name;
    this.setState({
      [stateField]: inputValue,
    });
    console.log(this.state);
  }
  async handleSubmit(event) {
    event.preventDefault();
    const { name, message } = this.state;
    await axios.post(
      'https://rcyg32ptue.execute-api.us-east-2.amazonaws.com/',
      { key1: `${id}, ${title},${author},${category}` }
    );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Id:</label>
          <input
            type="text"
            name="id"
            onChange={this.handleChange}
            value={this.state.id}
          />

          <label>Title:</label>
          <input
            type="text"
            name="title"
            onChange={this.handleChange}
            value={this.state.title}
          />
          <label>Author:</label>
          <input
            type="text"
            name="author"
            onChange={this.handleChange}
            value={this.state.author}
          />
          <label>Category:</label>
          <input
            type="text"
            name="category"
            onChange={this.handleChange}
            value={this.state.category}
          />

          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}