import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'react-bootstrap';
import img_banner from '../../assets/icons/img_banner.png'
import img_banner2 from '../../assets/icons/Banner_02.png'
import img_banner3 from '../../assets/icons/Banner_03.png'
import { Container, Grid, Paper, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ItemCourse from '../../components/shared/ItemCourse';
import ItemCategory from '../../components/shared/ItemCategory';
import CourseServices from '../../services/CourseServices';
import { useHistory } from 'react-router-dom';

HomePage.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        width: '100%',
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    container: {
        marginTop: theme.spacing(2),
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
}));

function HomePage(props) {
    const classes = useStyles();
    const [coursesOfWeek, setCoursesOfWeek] = useState([]);
    const [coursesWatchMost, setCoursesWatchMost] = useState([]);
    const [coursesNew, setCoursesNew] = useState([]);
    const [categoriesBest, setCategoriesBest] = useState([]);
    const history = useHistory();

    useEffect(() => {
        getCoursesOfWeek();
        getCoursesWatchMost();
        getCoursesNew();
        getCategoriesBest();
    }, []);

    const getCoursesOfWeek = async () => {
        CourseServices.GetCoursesOfWeek().then(res => {
            if (res.status == 200) {
                setCoursesOfWeek(res.data.data)
            }
        }).catch(err => {

        })
    }

    const getCoursesWatchMost = async () => {
        CourseServices.GetCoursesWatchMost().then(res => {
            if (res.status == 200) {
                setCoursesWatchMost(res.data.data)
            }
        }).catch(err => {

        })
    }

    const getCoursesNew = async () => {
        CourseServices.GetCoursesNew().then(res => {
            if (res.status == 200) {
                setCoursesNew(res.data.data)
            }
        }).catch(err => {

        })
    }

    const getCategoriesBest = async () => {
        CourseServices.GetCategoriesRegisterMost().then(res => {
            if (res.status == 200) {
                setCategoriesBest(res.data.data)
            }
        }).catch(err => {

        })
    }

    return (
        <div>
            <div className="ht-main d-flex flex-row align-items-center">
                <Carousel indicators={false} controls={true} interval={2000}>
                    <Carousel.Item>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 d-flex flex-column justify-content-center carousel-left">
                                <h1>Say hello to your private English tutor</h1>
                                <p>Become fluent faster through one-on-one video chat lessons tailored to your goals.</p>
                            </div>
                            <div className="container col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 d-flex justify-content-end align-items-center carousel-right">
                                <img
                                    className="ht-main-img"
                                    src={img_banner}
                                    alt="First slide"
                                />
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 d-flex flex-column justify-content-center carousel-left">
                                <h1>Say hello to your private English tutor</h1>
                                <p>Become fluent faster through one-on-one video chat lessons tailored to your goals.</p>
                            </div>
                            <div className="container col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 d-flex justify-content-end align-items-center carousel-right">
                                <img
                                    className="ht-main-img"
                                    src={img_banner2}
                                    alt="First slide"
                                />
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 d-flex flex-column justify-content-center carousel-left">
                                <h1>English immersion from anywhere</h1>
                                <p>Build English proficiency and confidence through real conversations with friendly tutors from the US, UK, Australia, and more. All you need is your device!</p>
                            </div>
                            <div className="container col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 d-flex justify-content-end align-items-center carousel-right">
                                <img
                                    className="ht-main-img"
                                    src={img_banner3}
                                    alt="First slide"
                                />
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
            <Container className={classes.container}>
                <Grid container className={classes.root} spacing={3}>
                    <Grid container item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="h3" component="h3">
                                <Box lineHeight={1} fontWeight="fontWeightBold">
                                    Khoá học nổi bật trong tuần
                                </Box>
                            </Typography>

                            <Grid container item style={{ marginTop: '8px' }}>
                                {coursesOfWeek.map((item) => {
                                    return <Grid onClick={() => history.push(`/courses/${item._id}`)} justify="center" key={item.title} container item xs={12} sm={4}>
                                        <ItemCourse course={item}></ItemCourse>
                                    </Grid>
                                })}
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid container item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="h3" component="h3">
                                <Box lineHeight={1} fontWeight="fontWeightBold">
                                    Khoá học được xem nhiều nhất
                                </Box>
                            </Typography>

                            <Grid container item spacing={1} style={{ marginTop: '8px' }}>
                                {coursesWatchMost.map((item) => {
                                    return <Grid onClick={() => history.push(`/courses/${item._id}`)} key={item.title} container item xs={12} sm={3}>
                                        <ItemCourse course={item}></ItemCourse>
                                    </Grid>
                                })}
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid container item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="h3" component="h3">
                                <Box lineHeight={1} fontWeight="fontWeightBold">
                                    Khoá học mới
                                </Box>
                            </Typography>

                            <Grid container item spacing={1} style={{ marginTop: '8px' }}>
                                {coursesNew.map((item) => {
                                    return <Grid onClick={() => history.push(`/courses/${item._id}`)} key={item.title} container item xs={12} sm={3}>
                                        <ItemCourse course={item}></ItemCourse>
                                    </Grid>
                                })}
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid container item xs={12}>
                        <Paper className={classes.paper}>
                            <Typography variant="h3" component="h3">
                                <Box lineHeight={1} fontWeight="fontWeightBold">
                                    Lĩnh vực được đăng ký nhiều nhất
                                </Box>
                            </Typography>

                            <Grid container
                                direction="row"
                                alignItems="center"
                                item style={{ marginTop: '8px' }}>
                                {categoriesBest.map((item) => {
                                    return <div onClick={() => history.push(`/courses?categoriesId=${item._id}`)}>
                                        <ItemCategory category={item}></ItemCategory>
                                    </div>
                                })}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            {/* 3-4 Khoá học nôỉ bật trong tuần */}
            {/* 10 Khoá học được xem nhiều nhất */}
            {/* 10 Khoá học mới nhất */}
            {/* Lĩnh vực được đăng ký học nhiều nhất */}

        </div>
    );
}

export default HomePage;