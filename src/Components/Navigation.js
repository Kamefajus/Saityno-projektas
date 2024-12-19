import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styled from "styled-components";

const NavContainer = styled.nav`
  background-color: #333;
  color: white;
  padding: 10px;
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: ${(props) => (props.isOpen ? "block" : "none")};
  }
`;

const MenuItem = styled.li`
  margin: 0 15px;
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <NavContainer>
      <HamburgerIcon onClick={() => setIsOpen(!isOpen)}>
        <FaBars />
      </HamburgerIcon>
      <Menu isOpen={isOpen}>
        <MenuItem>
          <Link to="/">Home</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/about">About</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/services">Services</Link>
        </MenuItem>
      </Menu>
    </NavContainer>
  );
};

export default Navigation;
