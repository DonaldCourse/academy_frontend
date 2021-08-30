import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, makeStyles, Typography, Paper, Box, Link, TextField } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ItemCourseVertical from '../components/ItemCourseVertical';
import CoursesService from '../../../services/CourseServices';
import CurriculumService from '../../../services/CurriculumService';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import queryString from 'query-string';
import ItemCourseVerticalLoading from '../components/ItemCourseVeticalLoading';

CourseSearchPage.propTypes = {

};

const options = ["most-registed", "highest-rated", "newest"];

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

function CourseSearchPage(props) {

    const classes = useStyles();
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [totalItem, setTotalItem] = useState(0);
    const [total, setTotal] = useState(1);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const search = queryString.parse(window.location.search);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    useEffect(() => {
        searchCategories(search.q);
    }, [search.q]);

    useEffect(async () => {
        searchCourses(limit, page, search.q, search.sort);
    }, [page, search.q, search.sort]);

    const handleChange = (event, value) => {
        setPage(value);
    };

    const searchCourses = (limit, page, query, sort) => {
        setLoading(true);
        try {
            CoursesService.SearchCourses(limit, page, query, sort).then(res => {
                setLoading(false);
                if (res.status == 200) {
                    setCourses(res.data.data.courses.list);
                    setTotal(res.data.data.courses.totalPages);
                    setTotalItem(res.data.data.courses.totalItems);
                }
            }).catch(err => {
                setLoading(false);
            })
        } catch (error) {
            setLoading(false);
        }
    }

    const searchCategories = async (query) => {
        try {
            CurriculumService.SearchCategories(query).then(res => {
                if (res.status == 200) {
                    setCategories(res.data.data.categories);
                }
            }).catch(err => {

            })
        } catch (error) {

        }

    }

    return (
        <div className={classes.root}>
            <Container className={classes.container}>
                <Typography variant="h3" component="h3">
                    <Box lineHeight={1} fontWeight="fontWeightBold">
                        {totalItem} kết quả cho {search.q}
                    </Box>
                </Typography>

                <Typography style={{ marginTop: '16px' }} variant="h4" component="h4">
                    <Box lineHeight={1} fontWeight="fontWeightBold">
                        Khám phá
                    </Box>
                </Typography>
                <div style={{ display: "flex" }}>
                    {categories && categories.map((item, index) => {
                        return <div key={index} style={{ display: "flex" }}>
                            <Typography style={{ marginTop: '16px' }} variant="h4" component="h4">
                                <Link component="button"
                                    variant="h4"
                                    onClick={() => {
                                        history.push(`/courses?categoriesId=${item._id}`)
                                    }}>
                                    <Box lineHeight={1} fontWeight="fontWeightBold">
                                        {item.name}
                                    </Box>
                                </Link>
                            </Typography>
                            {
                                index != categories.length - 1 ? <Typography style={{ marginTop: '16px' }} variant="h4" component="h4">
                                    ,&nbsp;
                                </Typography> : <></>
                            }

                        </div>
                    })}
                </div>
                <div style={{
                    display: "flex", justifyContent: "space-between"
                }}>
                    <Typography style={{ marginTop: '16px' }} variant="h4" component="h4">
                        <Box lineHeight={1} fontWeight="fontWeightBold">
                            Kết quả tìm kiếm :
                        </Box>
                    </Typography>
                    <Autocomplete
                        onChange={(event, newValue) => {
                            searchCourses(limit, page, search.q, newValue);
                        }}
                        size="small"
                        id="controllable-states-demo"
                        options={options}
                        style={{ width: 200 }}
                        renderInput={(params) => <TextField {...params} label="Sort" variant="outlined" />}
                    />
                </div>

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
        </div >
    );
}

export default CourseSearchPage;