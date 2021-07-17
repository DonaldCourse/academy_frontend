import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, makeStyles, Typography, Paper, Box } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import ItemCourseVertical from './components/ItemCourseVertical';
import CoursesService from '../../services/CourseServices';
import CurriculumService from '../../services/CurriculumService';
import { useLocation, useRouteMatch } from 'react-router-dom';
import queryString from 'query-string';
import ItemCourseVerticalLoading from './components/ItemCourseVeticalLoading';

Courses.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw',
        height: '100vh',
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

function Courses(props) {

    const classes = useStyles();
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState();
    const [total, setTotal] = useState(1);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const search = queryString.parse(window.location.search);;
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getCategoriesDetail();
    }, [search.categoriesId]);

    useEffect(async () => {
        getAllCourseOfCategory(limit, page);
    }, [page, search.categoriesId]);

    const getAllCourseOfCategory = async (limit, page) => {
        setLoading(true);
        CoursesService.GetCourses(search.categoriesId, limit, page).then(res => {
            setLoading(false);
            if (res.status == 200) {
                setCourses(res.data.data.list);
                setTotal(res.data.data.totalPages);
            }
        }).catch(err => {
            setLoading(false);
        })
    }

    const getCategoriesDetail = async () => {
        CurriculumService.GetCurriculumsDetail(search.categoriesId).then(res => {
            if (res.status == 200) {
                setCategories(res.data.data);
            }
        }).catch(err => {

        })
    }

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <div className={classes.root}>
            <Container className={classes.container}>
                <Typography variant="h3" component="h3">
                    <Box lineHeight={1} fontWeight="fontWeightBold">
                        Tất cả các khoá học thuộc : {categories && categories?.name && categories.name}
                    </Box>
                </Typography>

                <Grid container item spacing={1} style={{ marginTop: '8px' }}>
                    {
                        loading ? [1, 2, 3].map((item, index) => {
                            return <Grid key={index} container item xs={12}>
                                <ItemCourseVerticalLoading item={item}></ItemCourseVerticalLoading>
                            </Grid>
                        }) :
                            courses.length != 0 ? courses.map((item) => {
                                return <Grid key={item.title} container item xs={12}>
                                    <ItemCourseVertical item={item}></ItemCourseVertical>
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
        </div>
    );
}

export default Courses;