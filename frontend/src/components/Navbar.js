// components/Navbar.js
import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';
import { useState } from 'react';

const NavbarComponent = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">IW Todo App</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="#" disabled>
              {user ? `Logged in as: ${user.username}` : 'Guest'}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" onClick={onLogout}>
              Logout
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavbarComponent;
