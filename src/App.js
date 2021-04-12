import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateBook from "./components/createBook";
import EditBook from "./components/editBook";
import BookList from "./components/bookList";

function App() {
  return (<Router>
    <div className="App">
      <header className="App-header">
        <Navbar bg="dark" variant="dark">
          <Container>

            <Navbar.Brand>
              <Link to={"/create-book"} className="nav-link">
                MERN Stack App
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/create-book"} className="nav-link">
                  Add Book
                </Link>
              </Nav>

              {/* <Nav>
                <Link to={"/edit-book/:id"} className="nav-link">
                  Edit Book
                </Link>
              </Nav> */}

              <Nav>
                <Link to={"/book-list"} className="nav-link">
                  Book List
                </Link>
              </Nav>
            </Nav>

          </Container>
        </Navbar>
      </header>

      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' component={CreateBook} />
                <Route path="/create-book" component={CreateBook} />
                <Route path="/edit-book/:id" component={EditBook} />
                <Route path="/book-list" component={BookList} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;