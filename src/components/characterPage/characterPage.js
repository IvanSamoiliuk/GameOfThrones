import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import "./characterPage.css";
import ErrorMessage from "../errorMessage";
import GOTServices from "../../services/apiService";

export default class CharacterPage extends Component {
    gotServices = new GOTServices();

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
                    <ItemList
                        getData={this.gotServices.getAllCharacters}
                        onCharacterSelect={this.onCharacterSelect}
                        renderItem={({ name, gender }) => `${name} (${gender})`}
                    />
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
