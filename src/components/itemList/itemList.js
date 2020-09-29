import React, { Component } from "react";
import Spinner from "../spinner";
import GOTServices from "../../services/apiService";
import "./itemList.css";
import ErrorMessage from "../errorMessage";
export default class ItemList extends Component {
    gotServices = new GOTServices();

    state = {
        characterList: null,
        loading: true,
        error: false,
    };

    componentDidMount() {
        this.setState({ loading: true });

        this.gotServices
            .getAllCharacters()
            .then((characterList) => {
                this.setState({ characterList, error: false, loading: false });
            })
            .catch(() => {
                this.onError();
            });
    }

    componentDidCatch() {
        this.onError();
    }

    onError(status) {
        this.setState({
            characterList: null,
            error: true,
        });
    }

    renderItems = (itemList) => {
        return itemList.map((item) => {
            const { id, name } = item;
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => {
                        this.props.onCharacterSelect(id);
                    }}
                >
                    {name}
                </li>
            );
        });
    };

    render() {
        const { characterList, error, loading } = this.state;
        if (error) return <ErrorMessage />;
        if (loading) return <Spinner />;

        if (!characterList) {
            return <Spinner />;
        }

        const characters = this.renderItems(characterList);

        return <ul className="item-list list-group">{characters}</ul>;
    }
}
