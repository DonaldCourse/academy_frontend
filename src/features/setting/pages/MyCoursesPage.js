import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, makeStyles, Typography, Paper, Box, Link, TextField } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ItemCourseVertical from '../../courses/components/ItemCourseVertical';
import CoursesService from '../../../services/CourseServices';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import queryString from 'query-string';
import ItemCourseVerticalLoading from '../../courses/components/ItemCourseVeticalLoading';

MyCoursesPage.propTypes = {

};

const options = ["most-registed", "highest-rated", "newest"];

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        position: 'inherit',
        overflow: 'auto'
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

function MyCoursesPage(props) {

    const classes = useStyles();
    const [courses, setCourses] = useState([]);
    const [total, setTotal] = useState(1);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(async () => {
        getMyCourses(limit, page);
    }, [page]);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const getMyCourses = (limit, page) => {
        setLoading(true);
        try {
            CoursesService.MyCourses(limit, page).then(res => {
                setLoading(false);
                if (res.status == 200) {
                    setCourses(res.data.data.list);
                    setTotal(res.data.data.totalPages);
                }
            }).catch(err => {
                setLoading(false);
            })
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <div className={classes.root}>
            <Container className={classes.container}>
                <Typography variant="h3" component="h3">
                    <Box lineHeight={1} fontWeight="fontWeightBold">
                        Khoá học của tôi
                    </Box>
                </Typography>

                <Grid container item spacing={1} style={{ marginTop: '8px' }}>
                    {
                        loading ? [1, 2, 3].map((item, index) => {
                            return <Grid key={index} container item xs={12}>
                                <ItemCourseVerticalLoading item={item}></ItemCourseVerticalLoading>
                            </Grid>
                        }) :
                            courses.length != 0 ? courses.map((item, index) => {
                                return <Grid key={index} container item xs={12}>
                                    <ItemCourseVertical item={item.course_id}></ItemCourseVertical>
                                </Grid>
                            }) : (
                                <Grid container item xs={12}>
                                    <Typography>Không có khoá học trong danh muc</Typography>
                                </Grid>
                            )
                    }
                </Grid>

                <div className={classes.pagination}>
                    {
                        courses.length != 0 && <Pagination size="large" color="primary" count={total} page={page} siblingCount={0} onChange={handleChange} />
                    }
                </div>

            </Container>
        </div >
    );
}

export default MyCoursesPage;