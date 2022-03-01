import React, {useState, useEffect} from 'react'
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

    const [ users, setUsers ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await window.fetch('https://skydrone-api.herokuapp.com/api/v1/users')
            const data = await result.json();
            setUsers(data);
        }  // async function
        fetchData()
    }, [setUsers]) // [] = useEffect only runs once

  return (
    <Container>
        <ListGroup>
        {users.map(user => (
            <ListGroupItem className='d-flex'>
                <ListGroupItemHeading>{user.firstName_u}</ListGroupItemHeading>                
                <ButtonGroup className='ms-auto'>
                    <Button className='btn btn-warning'>Edit</Button>
                    <Button className='btn btn-danger'>Delete</Button>
                </ButtonGroup>
            </ListGroupItem>
        ))}
        </ListGroup>
    </Container>
  )
}