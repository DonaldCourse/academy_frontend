import React from 'react';
import PropTypes from 'prop-types';
import { Card, makeStyles, CardContent } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

ItemCourseVerticalLoading.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: "100%",
        cursor: "pointer",
        pointerEvents: "auto"
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: theme.spacing(2),
        width: "100%"
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
        height: 151
    },
    author: {
        display: 'flex',
        alignItems: 'center'
    },
    rating: {
        display: 'flex',
        alignItems: 'center'
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    maxLineOne: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical',
        marginTop: theme.spacing(1)
    },
    maxLineTwo: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        marginTop: theme.spacing(1)
    }
}));


function ItemCourseVerticalLoading({ item }) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Skeleton variant="rect" className={classes.cover} />

            <div className={classes.details}>
                <Skeleton animation="wave" height={10} width="100%" />
                <Skeleton animation="wave" height={10} width="80%" />
                <Skeleton animation="wave" height={10} width="60%" />
                <Skeleton animation="wave" height={10} width="40%" />
            </div>
        </Card>
    );
}

export default ItemCourseVerticalLoading;