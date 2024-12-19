import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #222;
  color: white;
  padding: 20px;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 My Application</p>
    </FooterContainer>
  );
};

export default Footer;
