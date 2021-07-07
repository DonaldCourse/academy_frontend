import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, makeStyles, Typography, Paper } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import ItemCourseVertical from './components/ItemCourseVertical';

Courses.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    container: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2)
    },
    rootGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    pagination: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

const courses = [
    {
        title: "Donald 1"
    },
    {
        title: "Donald 2"
    },
    {
        title: "Donald 3"
    },
    {
        title: "Donald 4"
    },
    {
        title: "Donald 5"
    }
]

function Courses(props) {

    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Typography variant="h3" component="h3">
                Donald Trieu
            </Typography>

            <Grid container item spacing={1} style={{ marginTop: '8px' }}>
                {courses.map((item) => {
                    return <Grid key={item.title} container item xs={12}>
                        <ItemCourseVertical></ItemCourseVertical>
                    </Grid>
                })}
            </Grid>

            <div className={classes.pagination}>
                <Pagination count={10} variant="outlined" color="primary" siblingCount={0} />
            </div>

        </Container>
    );
}

export default Courses;