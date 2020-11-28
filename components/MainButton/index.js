import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const StyledButton = styled.View`
  background-color: ${({ isGreen }) =>
    isGreen
      ? ({ theme }) => theme.colors.green
      : ({ theme }) => theme.colors.orange};
  padding: 20px 30px;
  border: none;
  border-radius: 18px;
  font-weight: ${({ theme }) => theme.fonts.bold};
  font-size: 16px;
  z-index: -1;
  display: flex;
  flex-direction: row;

  ${({ theme }) => theme.mixins.center}

  :focus {
    outline: 0;
  }
`;

const StyledLabel = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
  font-size: 22px;
`;

const StyledIcon = styled.Image`
  margin-left: 8%;
  padding: 0;
  width: 30px;
  height: 30px;
`;

const MainButton = ({ isGreen, text, hasIcon, isBoar }) => {
  return (
    <StyledButton isGreen={isGreen}>
      <StyledLabel>{text}</StyledLabel>
      {hasIcon &&
        (isBoar ? (
          <StyledIcon source={require("../../assets/logo/logo.png")} />
        ) : (
          <StyledIcon
            source={require("../../assets/footprints/footprints.png")}
          />
        ))}
    </StyledButton>
  );
};

MainButton.propTypes = {
  isGreen: PropTypes.bool,
  text: PropTypes.string.isRequired,
  hasIcon: PropTypes.bool,
  isBoar: PropTypes.bool,
};

MainButton.defaultProps = {
  isGreen: true,
  text: "",
  hasIcon: false,
  isBoar: true,
};

export default MainButton;
