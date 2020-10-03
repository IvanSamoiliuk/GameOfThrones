import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import "./app.css";
import ErrorMessage from "../errorMessage";
import CharactersPage from "../pages/charactersPage";
import BooksPage from "../pages/booksPage";
import HousesPage from "../pages/housesPage";
import BooksItem from "../pages/booksItem";
import GOTServices from "../../services/apiService";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
    gotServices = new GOTServices();

    state = {
        showRandomChar: true,
    };

    toggleRendomChar = () => {
        this.setState((state) => {
            return { showRandomChar: !state.showRandomChar };
        });
    };

    render() {
        if (this.state.error) {
            return <ErrorMessage />;
        }

        const character = this.state.showRandomChar ? <RandomChar interval={3000}/> : null;
        return (
            <Router>
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Route
                            path="/"
                            exact
                            component={() => <h1>Welcome to GOT DB</h1>}
                        />
                        <Row>
                            <Col lg={{ size: 5, offset: 0 }}>
                                {character}
                                <button
                                    className="toggle-btn"
                                    onClick={this.toggleRendomChar}
                                >
                                    Toggle random character
                                </button>
                            </Col>
                        </Row>

                        <Route path="/characters" component={CharactersPage} />
                        <Route path="/books" exact component={BooksPage} />
                        <Route path="/houses" component={HousesPage} />
                        <Route
                            path="/books/:id"
                            render={({ match }) => {
                                const { id } = match.params;
                                return <BooksItem bookID={id} />;
                            }}
                        />
                    </Container>
                </div>
            </Router>
        );
    }
}
