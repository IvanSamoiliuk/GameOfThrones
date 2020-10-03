import React, { Component } from "react";
import Spinner from "../spinner";
import "./itemList.css";
import ErrorMessage from "../errorMessage";
import PropTypes from "prop-types";
export default class ItemList extends Component {
    state = {
        itemList: null,
        loading: true,
        error: false,
    };

    static defaultProps = {
        onItemSelect: () => {},
    };

    static propTypes = {
        onItemSelect: PropTypes.func,
    };

    componentDidMount() {
        const { getData } = this.props;

        this.setState({ loading: true });

        getData()
            .then((itemList) => {
                this.setState({ itemList, error: false, loading: false });
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
            itemList: null,
            error: true,
        });
    }

    renderItems = (itemList) => {
        return itemList.map((item) => {
            const { id } = item;
            const label = this.props.renderItem(item);
            return (
                <li
                    key={id}
                    className="list-group-item"
                    onClick={() => {
                        this.props.onItemSelect(id);
                    }}
                >
                    {label}
                </li>
            );
        });
    };

    render() {
        const { itemList, error, loading } = this.state;
        if (error) return <ErrorMessage />;
        if (loading) return <Spinner />;

        if (!itemList) {
            return <Spinner />;
        }

        const s = this.renderItems(itemList);

        return <ul className="item-list list-group">{s}</ul>;
    }
}
