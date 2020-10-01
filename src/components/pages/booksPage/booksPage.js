import React, { Component } from "react";
import GOTServices from "../../../services/apiService";
import ItemDetails, { Field } from "../../charDetails";
import ErrorMessage from "../../errorMessage";
import ItemList from "../../itemList";
import RowBlock from "../../rowBlock";
import "./booksPage.css";

export default class BooksPage extends Component {
    gotServices = new GOTServices();

    state = {
        selectedBookID: null,
        error: false,
    };

    onItemSelect = (selectedBookID) => {
        this.setState({ selectedBookID });
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
                getData={this.gotServices.getAllBooks}
                onItemSelect={this.onItemSelect}
                renderItem={({ name, numberOfPages }) =>
                    `${name} (${numberOfPages})`
                }
            />
        );

        const bookDetails = (
            <ItemDetails
                endpoint={this.gotServices.getBook}
                selectedItemID={this.state.selectedBookID}
            >
                <Field field="numberOfPages" label="Number of pages" />
                <Field field="authors" label="Authors" />
            </ItemDetails>
        );

        return <RowBlock left={itemList} right={bookDetails} />;
    }
}
