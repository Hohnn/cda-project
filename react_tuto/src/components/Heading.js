import React from 'react'
import { Link } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
    NavbarBrand,
} from 'reactstrap';
export const Heading = () => {
  return (
    <Navbar color="dark" dark>
        <NavbarBrand href="/">React Tutorial</NavbarBrand>
        <Nav className="mr-auto">
            <NavItem>
                <NavLink tag={Link} to="/">Home</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} to="/add">Add User</NavLink>
            </NavItem>
        </Nav>
    </Navbar>
  )
}
