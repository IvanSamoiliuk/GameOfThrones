import React, { Component } from "react";
import GOTServices from "../../services/apiService";
import ErrorMessage from "../errorMessage";
import Spinner from "../spinner";
import "./itemDetails.css";

export const Field = ({ item, field, label }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};
export default class ItemDetails extends Component {
    gotServices = new GOTServices();

    state = {
        item: null,
        loading: true,
        error: false,
    };
    componentDidMount() {
        this.updateItem();
    }
    componentDidUpdate(prevProps) {
        if (this.props.selectedItemID !== prevProps.selectedItemID) {
            this.updateItem();
        }
    }

    componentDidCatch() {
        this.onError();
    }

    onItemDetailsLoaded(item) {
        this.setState({ item, loading: false });
    }

    onError() {
        this.setState({ error: true, item: null });
    }

    updateItem() {
        const { selectedItemID } = this.props;

        if (!selectedItemID) return;

        this.setState({
            loading: true,
        });

        this.props
            .endpoint(this.props.selectedItemID)
            .then((item) => {
                this.onItemDetailsLoaded(item);
            })
            .catch(() => this.onError());
    }

    render() {
        const { item, error, loading } = this.state;
        if (!item && error) {
            return <ErrorMessage />;
        } else if (!item) {
            return (
                <span className={"select-error"}>Please select any item</span>
            );
        }

        if (loading) {
            return (
                <div className="char-details rounded">
                    <Spinner />
                </div>
            );
        }

        const { name } = item;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {React.Children.map(this.props.children, (child) => {
                        return React.cloneElement(child, { item });
                    })}
                </ul>
            </div>
        );
    }
}
