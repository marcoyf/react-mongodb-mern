import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class CreateBook extends Component {
  state = {
    title: "",
    author: "",
    year: "",
  };

  constructor(props) {
    super(props);

    this.onChangeBookTitle = this.onChangeBookTitle.bind(this);
    this.onChangeBookAuthor = this.onChangeBookAuthor.bind(this);
    this.onChangeBookYear = this.onChangeBookYear.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChangeBookTitle(e) {
    this.setState({ title: e.target.value });
  }

  onChangeBookAuthor(e) {
    this.setState({ author: e.target.value });
  }

  onChangeBookYear(e) {
    this.setState({ year: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const bookObject = {
      title: this.state.title,
      author: this.state.author,
      year: this.state.year,
    };

    axios
      .post("http://localhost:4000/books/create-book", bookObject)
      .then((res) => console.log(res.data));

    this.setState({
      title: "",
      author: "",
      year: "",
    });

    // redirect to book list
    this.props.history.push("/book-list");
  }

  render() {
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="Title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={this.state.title}
              onChange={this.onChangeBookTitle}
            />
          </Form.Group>

          <Form.Group controlId="Author">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={this.state.author}
              onChange={this.onChangeBookAuthor}
            />
          </Form.Group>

          <Form.Group controlId="Year">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="text"
              value={this.state.year}
              onChange={this.onChangeBookYear}
            />
          </Form.Group>

          <Button variant="danger" size="lg" block="block" type="submit">
            Add Book
          </Button>
        </Form>
      </div>
    );
  }
}
