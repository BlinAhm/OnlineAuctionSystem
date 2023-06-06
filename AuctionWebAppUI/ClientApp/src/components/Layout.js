import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Footer from './Footer';
import NavBar from './NavBar';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div>
                <NavBar />
                <Container>
                    {this.props.children}
                </Container>
                <Footer />
            </div>
        );
    }
}
