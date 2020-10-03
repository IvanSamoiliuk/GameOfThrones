import React, { Component } from "react";
import GOTServices from "../../../services/apiService";
import ErrorMessage from "../../errorMessage";
import ItemList from "../../itemList";
import "./booksPage.css";
import { withRouter } from "react-router-dom";

class BooksPage extends Component {
    gotServices = new GOTServices();

    state = {
        error: false,
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
            <ItemList
                getData={this.gotServices.getAllBooks}
                onItemSelect={(itemID) => {
                    this.props.history.push(`/books/${itemID}`);
                }}
                renderItem={({ name, numberOfPages }) =>
                    `${name} (${numberOfPages})`
                }
            />
        );
    }
}

export default withRouter(BooksPage);
