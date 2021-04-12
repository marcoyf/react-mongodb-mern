import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class EditBook extends Component {
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

  componentDidMount() {
    axios
      .get(
        "http://localhost:4000/books/edit-book/" + this.props.match.params.id
      )
      .then((res) => {
        this.setState({
          title: res.data.title,
          author: res.data.author,
          year: res.data.year,
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
      .put(
        "http://localhost:4000/books/update-book/" + this.props.match.params.id,
        bookObject
      )
      .then((res) => {
        console.log(res.data);
        console.log("Book successfully updated");
      })
      .catch((error) => {
        console.log(error);
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
            Update Book
          </Button>
        </Form>
      </div>
    );
  }
}
