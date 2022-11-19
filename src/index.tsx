import {
  Divider,
  FluentProvider,
  makeStyles,
  Text,
  webLightTheme,
} from "@fluentui/react-components";
import group from "core-js-pure/actual/array/group";
import React from "react";
import ReactDOM from "react-dom/client";
import { Main } from "./Main";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  maxHeight: {
    height: "100%",
  },
  mainWrapper: {
    flexGrow: "1",
    flexBasis: "1",
  },
  footerWrapper: {
    flexBasis: "1",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    paddingBottom: "10px",
    marginTop: "10px",
  },
  footerText: {
    textAlign: "center",
    marginTop: "10px",
  },
});

const Index: React.FC = () => {
  const styles = useStyles();

  return (
    <FluentProvider className={styles.maxHeight} theme={webLightTheme}>
      <div className={styles.container}>
        <div className={styles.mainWrapper}>
          <Main />
        </div>
        <div className={styles.footerWrapper}>
          <Divider />
          <Text className={styles.footerText} size={400}>
            Rollerv2 Copyright © 2022 HCGStudio All rights reserved.
          </Text>
        </div>
      </div>
    </FluentProvider>
  );
};

//F**k it
if (!Array.prototype.group)
  Array.prototype.group = function (callBackFn, thisArg) {
    return group(this, callBackFn, thisArg);
  };

const root = ReactDOM.createRoot(document.getElementById("app")!);
root.render(<Index />);
