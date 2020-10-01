import React, { Component } from "react";
import GOTServices from "../../../services/apiService";
import ItemDetails, { Field } from "../../charDetails";
import ErrorMessage from "../../errorMessage";
import ItemList from "../../itemList";
import RowBlock from "../../rowBlock";
import "./housesPage.css";

export default class HousesPage extends Component {
    gotServices = new GOTServices();

    state = {
        selectedHouseID: null,
        error: false,
    };

    onItemSelect = (selectedHouseID) => {
        this.setState({ selectedHouseID });
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
                getData={this.gotServices.getAllHouses}
                onItemSelect={this.onItemSelect}
                renderItem={({ name }) => `${name}`}
            />
        );

        const houseDetails = (
            <ItemDetails
                endpoint={this.gotServices.getHouse}
                selectedItemID={this.state.selectedHouseID}
            >
                <Field field="words" label="Words" />
                <Field field="region" label="Region" />
                <Field field="currentLord" label="Current Lord" />
            </ItemDetails>
        );

        return <RowBlock left={itemList} right={houseDetails} />;
    }
}
