import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar() {

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <i aria-hidden="true" className="users disabled icon" style={{marginRight: '10px'}}></i>
                    Covidility
                </Menu.Item>
                <Menu.Item as={NavLink} to='/bookings' name='Bookings' />
                <Menu.Item as={NavLink} to='/errors' name='Erros' />
                <Menu.Item>
                    <Button as={NavLink} to='/createBooking' positive content='Book Test' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}