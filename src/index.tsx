import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import React from "react";
import ReactDOM from "react-dom";
import { Main } from "./Main";

ReactDOM.render(
  <FluentProvider theme={webLightTheme}>
    <Main />
  </FluentProvider>,
  document.getElementById("app")
);
