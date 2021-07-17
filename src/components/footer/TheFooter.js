import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Grid, Typography } from '@material-ui/core';

TheFooter.propTypes = {};
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  footer_area: {
    display: 'flex',
    position: 'relative',
    bottom: 0,
    zIndex: 1,
    backgroundColor: 'rgb(230 226 226 / 26%)',
    height: 70,
    alignItems: 'center',
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },

  copy_right: {
    fontSize: '16px',
    fontWeight: 500,
    color: '#212b36',
  },

  link: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

function TheFooter(props) {
  const { color } = props;
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.footer_area}
      style={{ backgroundColor: color }}
    >
      <Grid item sm={6}>
        <Typography className={classes.copy_right}>
          © TingTong 2020 - Make in Vietnam.
        </Typography>
      </Grid>
      <Grid item sm={6} className={classes.link}>
        <a className="ml-3">
          <i className="fa fa-facebook fa-lg" />
        </a>
        <a className="ml-3">
          <i className="fa fa-twitter fa-lg" />
        </a>
        <a className="ml-3">
          <i className="fa fa-google-plus fa-lg" />
        </a>
        <a className="ml-3">
          <i className="fa fa-instagram fa-lg" />
        </a>
      </Grid>
    </Grid>
  );
}

export default TheFooter;
