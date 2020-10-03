import React, { Component } from "react";
import GOTServices from "../../../services/apiService";
import ItemDetails, { Field } from "../../itemDetails";

export default class BooksItem extends Component {
    gotServices = new GOTServices();

    render() {
        return (
            <ItemDetails
                endpoint={this.gotServices.getBook}
                selectedItemID={this.props.bookID}
            >
                <Field field="numberOfPages" label="Number of pages" />
                <Field field="authors" label="Authors" />
            </ItemDetails>
        );
    }
}
