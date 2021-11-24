import React, { Fragment } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import theme from "themes/theme";
import GlobalStyles from "styles/GlobalStyles";
import GrammarCheckerSection from "sections/GrammarCheckerSection";
import FeatureSection from "sections/FeatureSection";
import PricingSection from "sections/PricingSection";
import NavBar from "components/nav-bar/NavBar";

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Fragment>
        <NavBar />
        <GrammarCheckerSection />
        <div style={{height: "500px", backgroundColor:"white"}}></div>
        <FeatureSection />
        <PricingSection />
      </Fragment>
    </MuiThemeProvider>
  );
}

export default App;
