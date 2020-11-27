import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledButton = styled.TouchableOpacity`
  background-color: ${({ isGreen }) =>
    isGreen
      ? ({ theme }) => theme.colors.green
      : ({ theme }) => theme.colors.orange};
  padding: 10px 20px;
  border: none;
  border-radius: 18px;
  font-weight: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
  z-index: -1;
  ${({ theme }) => theme.mixins.center}

  :focus {
    outline: 0;
  }
`;

const StyledLabel = styled.Text`
  color: ${({ theme }) => theme.colors.white};
`;

const MainButton = ({ isGreen, text }) => {
  return (
    <StyledButton isGreen={isGreen}>
      <StyledLabel>{text}</StyledLabel>
    </StyledButton>
  );
};

MainButton.propTypes = {
  isGreen: PropTypes.bool,
  text: PropTypes.string,
};

MainButton.defaultProps = {
  isGreen: true,
  text: "",
};

export default MainButton;
