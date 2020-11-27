import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { Button } from "react-native";

const StyledButton = styled.Button`
  background-color: ${({ isGreen }) =>
    isGreen
      ? ({ theme }) => theme.colors.green
      : ({ theme }) => theme.colors.orange};
  padding: 1rem 2rem;
  border: none;
  border-radius: 18px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.fonts.bold};
  font-size: 2;

  :focus {
    outline: 0;
  }
`;

const MainButton = ({ isGreen, children }) => {
  return <StyledButton isGreen={isGreen}>{children}</StyledButton>;
};

MainButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  isGreen: PropTypes.bool,
};

MainButton.defaultProps = {
  isGreen: true,
};

export default MainButton;
