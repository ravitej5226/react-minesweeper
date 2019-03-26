import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  createGlobalStyle,
  ThemeProvider as StyledThemeProvider,
  StyleSheetManager
} from "styled-components";
import globalStyleRules from "./globalStyleRules";
import theme from "./";

const GlobalStyle = createGlobalStyle`${globalStyleRules}`;

const ThemeProvider = props => {
  const body = (
    <StyledThemeProvider theme={theme}>
      <Fragment>
        <GlobalStyle />
        {props.children}
      </Fragment>
    </StyledThemeProvider>
  );
  return props.sheet ? (
    <StyleSheetManager sheet={props.sheet.instance}>{body}</StyleSheetManager>
  ) : (
    body
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.any,
  // when performing SSR, the style sheet created on server side to collect styles
  // when running in the browser, should be null
  sheet: PropTypes.object
};

export default ThemeProvider;
