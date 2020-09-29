import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import "./characterPage.css";
import ErrorMessage from "../errorMessage";

export default class CharacterPage extends Component {
    state = {
        selectedCharacterID: null,
        error: false,
    };

    onCharacterSelect = (selectedCharacterID) => {
        this.setState({ selectedCharacterID });
    };

    componentDidCatch() {
        this.setState({
            error: true,
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />;
        }

        return (
            <Row>
                <Col md="6">
                    <ItemList onCharacterSelect={this.onCharacterSelect} />
                </Col>
                <Col md="6">
                    <CharDetails
                        selectedCharacterID={this.state.selectedCharacterID}
                    />
                </Col>
            </Row>
        );
    }
}
