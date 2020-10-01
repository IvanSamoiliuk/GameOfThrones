import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import "./app.css";
import ErrorMessage from "../errorMessage";
import CharacterPage from "../characterPage/characterPage";
import GOTServices from "../../services/apiService";
import BooksPage from "../pages/booksPage/booksPage";
import HousesPage from "../pages/housesPage/housesPage";

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

        const character = this.state.showRandomChar ? <RandomChar /> : null;
        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
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
                    <CharacterPage />
                    <BooksPage />
                    <HousesPage />
                    {/* <Row>
                        <Col md="6">
                            <ItemList
                                getData={this.gotServices.getAllBooks}
                                onItemSelect={this.onItemSelect}
                            />
                        </Col>
                        <Col md="6">
                            <CharDetails
                                selectedCharacterID={
                                    this.state.selectedCharacterID
                                }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <ItemList
                                getData={this.gotServices.getAllHouses}
                                onItemSelect={this.onItemSelect}
                            />
                        </Col>
                        <Col md="6">
                            <CharDetails
                                selectedCharacterID={
                                    this.state.selectedCharacterID
                                }
                            />
                        </Col>
                    </Row> */}
                </Container>
            </>
        );
    }
}
