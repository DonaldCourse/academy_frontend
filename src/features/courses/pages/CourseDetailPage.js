import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, makeStyles, CardMedia, CardContent, Typography, Avatar, Box, Paper, CardActions, Button, Divider } from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import Pagination from '@material-ui/lab/Pagination';
import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CourseServices from '../../../services/CourseServices';
import ItemLesson from '../components/ItemLesson';
import PopupPreviewVideo from '../components/PopupPreviewVideo';
import ItemReview from '../components/ItemReview';
import { List } from '@material-ui/core';
import ItemCourseVerticalSmall from '../components/ItemCourseVerticalSmall';

CourseDetailPage.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: "100%"
    },
    container: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: "100%",
        height: 271
    },
    author: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1),
    },
    rating: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1),
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
        WebkitBoxOrient: 'vertical'
    },
    maxLineTwo: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        marginTop: theme.spacing(1),
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        margin: theme.spacing(2)
    },
    feedback: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2)
    }
}));

function CourseDetailPage(props) {
    const classes = useStyles();
    const { params } = useRouteMatch();

    const [course, setCourseDetail] = useState();
    const [coursesRelated, setCoursesRelated] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [open, setOpen] = useState(false);
    const [lessonSelected, setLessonSelected] = useState({});
    const [feedbacks, setFeedbacks] = useState([]);
    const [total, setTotal] = useState(1);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        getCourseDetail();
        getAllRelated();
    }, [params]);

    useEffect(async () => {
        getAllFeedback(page, limit);
    }, [page, params]);

    const getCourseDetail = async () => {
        CourseServices.GetCourseDetail(params.id).then(res => {
            if (res.status == 200) {
                setCourseDetail(res.data.data.course);
                setLessons(res.data.data.lessons);
            }
        }).catch(err => {

        })
    }

    const getAllFeedback = async (page, limit) => {
        CourseServices.GetAllFeedbackOfCourse(page, limit, params.id).then(res => {
            if (res.status == 200) {
                setFeedbacks(res.data.data.list);
                setTotal(res.data.data.totalPages);
            }
        }).catch(err => {

        })
    }

    const getAllRelated = async () => {
        CourseServices.GetAllCourseRelated(params.id).then(res => {
            if (res.status == 200) {
                setCoursesRelated(res.data.data);
            }
        }).catch(err => {

        })
    }

    const handleChange = (event, value) => {
        setPage(value);
    };

    const htmlDecode = input => {
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }

    const handleOnClickLesson = (item) => {
        setOpen(!open);
        setLessonSelected(item);
    }

    const handleOnClose = () => {
        setOpen(!open);
    }

    return (
        <div className={classes.root}>
            <CardMedia
                component="img"
                alt="Contemplative Reptile"
                image={course && course.avatar}
                className={classes.cover}>
            </CardMedia>
            <Container className={classes.container}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <Card className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography variant="h5" component="h5" className={classes.maxLineTwo}>
                                    <Box lineHeight={1} fontWeight="fontWeightBold">
                                        {course && course.title}
                                    </Box>
                                </Typography>
                                <Typography className={classes.maxLineTwo} variant="body1" component="p">{course && course.overview}</Typography>
                                <div className={classes.author}>
                                    <Avatar aria-label="recipe" className={classes.small}>
                                    </Avatar>
                                    <Typography style={{ marginLeft: '8px' }} variant="body2" component="p">{course && course.lecturer_id.name}</Typography>
                                </div>
                                <div className={classes.rating}>
                                    <Typography variant="body2" component="p" style={{ color: '#be5a0e', fontWeight: 700, lineHeight: 1.2 }}>{course && course.rating}</Typography>
                                    <Rating style={{ marginLeft: '8px' }} name="half-rating-read" size="small" value={course && course.rating || 1} precision={0.5} readOnly />
                                    <Typography style={{ marginLeft: '8px' }} variant="body2" component="p">({course && course.count_rating})</Typography>
                                </div>
                                <Typography style={{ marginTop: '8px' }} variant="body2" component="p">Level : {course && course.minimum_skill}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    type='button'
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}>
                                    Đăng ký
                                </Button>
                                <Button
                                    type='button'
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}>
                                    Đánh giá
                                </Button>
                            </CardActions>
                        </Card>

                        <Paper style={{ marginTop: '16px' }} className={classes.paper}>
                            <Typography variant="h5" component="h5" className={classes.maxLineTwo}>
                                <Box lineHeight={1} fontWeight="fontWeightBold">
                                    Các khoá học liên quan
                                </Box>
                            </Typography>
                            <List className={classes.related}>
                                {
                                    coursesRelated && coursesRelated.map((item, index) => {
                                        return <ItemCourseVerticalSmall key={index} item={item}></ItemCourseVerticalSmall>
                                    })
                                }
                            </List>
                        </Paper>

                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Paper className={classes.paper}>
                            <Typography variant="h3" component="h3" className={classes.maxLineOne}>
                                <Box lineHeight={1} fontWeight="fontWeightBold">
                                    Mô tả
                                </Box>
                            </Typography>

                            <div dangerouslySetInnerHTML={{ __html: htmlDecode(course && course.description) }} />

                            <Typography variant="h3" component="h3" className={classes.maxLineOne}>
                                <Box lineHeight={1} fontWeight="fontWeightBold">
                                    Danh sách bài học
                                </Box>

                                <div style={{ marginTop: "16px", marginBottom: "16px", width: "100%", border: "1px solid #eeeeee", borderRadius: "4px" }}>
                                    {
                                        lessons && lessons.map((item, index) => {
                                            return <ItemLesson key={index} lesson={item} onClick={handleOnClickLesson}></ItemLesson>
                                        })
                                    }
                                </div>

                            </Typography>

                            <Typography variant="h3" component="h3" className={classes.maxLineOne}>
                                <Box lineHeight={1} fontWeight="fontWeightBold">
                                    Đánh giá của học sinh
                                </Box>
                            </Typography>
                            <div className={classes.feedback}>
                                {
                                    feedbacks && feedbacks.map((item, index) => {
                                        return <div key={index} style={{ width: "100%" }}>
                                            <ItemReview item={item}></ItemReview>
                                            <Divider style={{ width: "100%", marginTop: '16px' }}></Divider>
                                        </div>
                                    })
                                }
                            </div>
                            <div className={classes.pagination}>
                                <Pagination size="large" color="primary" count={total} page={page} siblingCount={0} onChange={handleChange} />
                            </div>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <PopupPreviewVideo open={open} onClose={handleOnClose} lesson={lessonSelected}></PopupPreviewVideo>
        </div>
    );
}

export default CourseDetailPage;