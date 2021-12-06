import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {
  Box,
  withStyles,
  withWidth,
} from "@material-ui/core";
import WaveBorder from "components/text-editor/WaveBorder";
import { TextEditor } from 'components/text-editor/TextEditor';
import { GrammarCard } from 'components/grammar-card/GrammarCard';
import 'styles/text-editor.css';
import { Output } from "components/text-editor/Output";
import { HiArrowNarrowRight } from "react-icons/hi";

const styles = (theme) => ({
  extraLargeButtonLabel: {
    fontSize: theme.typography.body1.fontSize,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  card: {
    boxShadow: theme.shadows[4],
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(5.5),
      paddingBottom: theme.spacing(5.5),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("lg")]: {
      width: "auto",
    },
  },
  wrapper: {
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(2),
  },
  image: {
    maxWidth: "100%",
    verticalAlign: "middle",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
  },
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(6),
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(3),
    },
  },
  containerFix: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "none !important",
    },
  },
  waveBorder: {
    paddingTop: theme.spacing(0),
  },
});
const GrammarCheckerSection = props => {
  const { classes, theme } = props;
  const [value, setValue] = useState('');
  const passValue = (newValue) => {
    setValue(newValue);
  }
  return (
    <Fragment >
      <div className={classNames("lg-p-top", classes.wrapper)} >
        <div className={classNames("container-fluid", classes.container)} >
          <Box display="flex"
            justifyContent="center"
            className="row" >
            <div>
              <div className='background' >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <TextEditor passValue={passValue} />
                  {value == '' ? <div></div> : <HiArrowNarrowRight color="#ffffff" size={70} style={{ margin: "auto 20px " }} />}
                  {value == '' ? <div></div> : <Output value={value} />}
                </div>
              </div>
            </div>
          </Box>
        </div>
      </div>
      <WaveBorder upperColor={theme.palette.secondary.main}
        lowerColor="#FFFFFF"
        className={classes.waveBorder}
        animationNegativeDelay={2} />
    </Fragment>
  );
}

GrammarCheckerSection.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
};

export default withWidth()(
  withStyles(styles, { withTheme: true })(GrammarCheckerSection)
);