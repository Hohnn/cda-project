import React from 'react'
import { Link } from 'react-router-dom';
import { 
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    Button,
    ButtonGroup,
    Container
} from 'reactstrap';

export const UserList = () => {
  return (
    <Container>
        <ListGroup>
            <ListGroupItem className='d-flex'>
                <ListGroupItemHeading>Name: john</ListGroupItemHeading>                
                <ButtonGroup className='ms-auto'>
                    <Button className='btn btn-warning'>Edit</Button>
                    <Button className='btn btn-danger'>Delete</Button>
                </ButtonGroup>
            </ListGroupItem>
        </ListGroup>
    </Container>
  )
}