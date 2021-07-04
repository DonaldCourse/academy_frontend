import React from 'react';
import PropTypes from 'prop-types';
import TheHeader from '../header/TheHeader'
import TheFooter from '../footer/TheFooter'
import TheContent from '../content/TheContent'
import { makeStyles } from '@material-ui/core/styles';

TheLayout.propTypes = {

};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    content: {
        display: 'flex',
        paddingTop: '64px'
    },
}));

function TheLayout(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <TheHeader></TheHeader>
            <div className={classes.content}>
                <TheContent></TheContent>
            </div>
            <TheFooter></TheFooter>
        </div>
    );
}

export default TheLayout;