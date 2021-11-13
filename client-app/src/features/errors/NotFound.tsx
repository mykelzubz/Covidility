import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Oops - Page not found!
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/bookings' primary>
                    Return to bookings page
                </Button>
            </Segment.Inline>

        </Segment>
    )
}