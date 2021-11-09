import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
    openForm: () => void;
}

export default function NavBar({openForm}: Props) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <i aria-hidden="true" className="users disabled icon" style={{marginRight: '10px'}}></i>
                    {/* <img src="/assets/logo.png" alt="logo" /> */}
                    Covidility
                </Menu.Item>
                <Menu.Item name='Bookings' />
                <Menu.Item>
                    <Button onClick={openForm} positive content='Book Test' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}