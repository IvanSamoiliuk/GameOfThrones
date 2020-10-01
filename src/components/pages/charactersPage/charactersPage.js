import React, { Component } from "react";
import ItemList from "../../itemList";
import ItemDetails, { Field } from "../../charDetails";
import "./characterPage.css";
import ErrorMessage from "../../errorMessage";
import GOTServices from "../../../services/apiService";
import RowBlock from "../../rowBlock";

export default class CharactersPage extends Component {
    gotServices = new GOTServices();

    state = {
        selectedCharacterID: null,
        error: false,
    };

    onItemSelect = (selectedCharacterID) => {
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

        const itemList = (
            <ItemList
                getData={this.gotServices.getAllCharacters}
                onItemSelect={this.onItemSelect}
                renderItem={({ name, gender }) => `${name} (${gender})`}
            />
        );

        const charDetails = (
            <ItemDetails
                endpoint={this.gotServices.getCharacter}
                selectedItemID={this.state.selectedCharacterID}
            >
                <Field field="gender" label="Gender" />
                <Field field="born" label="Born" />
                <Field field="died" label="Died" />
                <Field field="culture" label="Culture" />
            </ItemDetails>
        );

        return <RowBlock left={itemList} right={charDetails} />;
    }
}
