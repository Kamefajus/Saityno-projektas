import React from "react";
import styled from "styled-components";
import Form from "./Form";
import Modal from "./Modal";

const ContentContainer = styled.main`
  padding: 20px;
`;

const Content = () => {
  return (
    <ContentContainer>
      <h2>Welcome to our page</h2>
      <Form />
      <Modal />
    </ContentContainer>
  );
};

export default Content;
