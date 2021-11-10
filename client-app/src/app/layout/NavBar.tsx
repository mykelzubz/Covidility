import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar() {
    const {bookingStore} = useStore();

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
                    <Button onClick={() => bookingStore.openForm()} positive content='Book Test' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}