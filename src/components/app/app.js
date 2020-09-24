import React from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ItemList from "../itemList";
import CharDetails from "../charDetails";
import "./app.css";

const App = () => {
    return (
        <>
            <Container>
                <Header />
            </Container>
            <Container>
                <Row>
                    <Col lg={{ size: 5, offset: 0 }}>
                        <RandomChar />
                        <button className="toggle-btn" onClick={onToggle}>
                            Button
                        </button>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <ItemList />
                    </Col>
                    <Col md="6">
                        <CharDetails />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

function onToggle() {
    const randomCharBlock = document.querySelector(".random-block");
    randomCharBlock.classList.toggle("hide");
}

export default App;
