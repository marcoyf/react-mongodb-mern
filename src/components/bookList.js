import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import BookTableRow from "./BookTableRow";

export default class BookList extends Component {
  
  state = {
    books: [],
  };

  componentDidMount() {
    this.getDataHandler();
  }

  componentDidUpdate() {
    this.getDataHandler();
  }

  getDataHandler() {
    axios
      .get("http://localhost:4000/books/")
      .then((res) => {
        this.setState({
          books: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getDataTable() {
    return this.state.books.map((res, i) => {
      return <BookTableRow obj={res} key={i} />;
    });
  }

  render() {
    return (
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.getDataTable()}</tbody>
        </Table>
      </div>
    );
  }
}
