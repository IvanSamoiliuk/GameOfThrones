import React, { Component } from "react";
import GOTServices from "../../services/apiService";
import ErrorMessage from "../errorMessage";
import Spinner from "../spinner";
import "./charDetails.css";
export default class CharDetails extends Component {
    gotServices = new GOTServices();

    state = {
        character: null,
        loading: true,
        error: false,
    };
    componentDidMount() {
        this.updateCharacter();
    }
    componentDidUpdate(prevProps) {
        if (this.props.selectedCharacterID !== prevProps.selectedCharacterID) {
            this.updateCharacter();
        }
    }

    componentDidCatch() {
        this.onError();
    }

    onCharDetailsLoaded(character) {
        this.setState({ character, loading: false });
    }

    onError() {
        this.setState({ error: true, character: null });
    }

    updateCharacter() {
        const { selectedCharacterID } = this.props;

        if (!selectedCharacterID) return;

        this.setState({
            loading: true,
        });

        this.gotServices
            .getCharacter(this.props.selectedCharacterID)
            .then((character) => {
                this.onCharDetailsLoaded(character);
            })
            .catch(() => this.onError());
    }

    render() {
        const { character, error, loading } = this.state;
        if (!character && error) {
            return <ErrorMessage />;
        } else if (!character) {
            return (
                <span className={"select-error"}>
                    Please select any character
                </span>
            );
        }

        if (loading) {
            return (
                <div className="char-details rounded">
                    <Spinner />
                </div>
            );
        }

        const { name, gender, born, died, culture } = this.state.character;

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </li>
                </ul>
            </div>
        );
    }
}
