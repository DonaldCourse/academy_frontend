import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, makeStyles, CardMedia, CardContent, Typography, Avatar, Box, Paper, CardActions, Button, Divider } from '@material-ui/core';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import Pagination from '@material-ui/lab/Pagination';
import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ItemLesson from '../components/ItemLesson';
import PopupPreviewVideo from '../components/PopupPreviewVideo';
import ItemReview from '../components/ItemReview';
import { List } from '@material-ui/core';
import ItemCourseVerticalSmall from '../components/ItemCourseVerticalSmall';
import { useAuth } from '../../../context/auth';
import CourseServices from '../../../services/CourseServices';
import Swal from 'sweetalert2'
import DialogFeedbackCourse from '../components/DialogFeedbackCourse';

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
    const history = useHistory();

    const [course, setCourseDetail] = useState();
    const [coursesRelated, setCoursesRelated] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [open, setOpen] = useState(false);
    const [openReview, setOpenReview] = useState(false);
    const [lessonSelected, setLessonSelected] = useState({});
    const [feedbacks, setFeedbacks] = useState([]);
    const [total, setTotal] = useState(1);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { auth } = useAuth();
    const [validateCourse, setValidateCourse] = useState(false);

    useEffect(() => {
        getCourseDetail();
        getAllRelated();
        if (auth && auth?.role && auth.role == "student") {
            console.log("Donald");
            handleValidateCourse();
        }
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

    const handleOnCloseReview = () => {
        setOpenReview(!openReview);
    }

    const handleRegisterCourse = async () => {
        if (auth && auth?.role && auth.role == "student") {
            CourseServices.RegisterCourse(params.id).then(res => {
                if (res.status == 201) {
                    setValidateCourse(true);
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Bắt đầu học thôi nào !!!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Đăng ký không thành công !!!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }).catch(err => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Đăng ký không thành công !!!',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
        } else {
            history.replace('/login');
        }
    }

    const handleValidateCourse = async () => {
        try {
            CourseServices.CheckRegisterCourse(params.id).then(res => {
                if (res.status == 200) {
                    setValidateCourse(res.data.data)
                }
            })
        } catch (error) {

        }
    }

    const handleFeedback = (body) => {
        setOpenReview(!openReview)
        CourseServices.PostReviewCourse(params.id, body).then(res => {
            if (res.status == 201) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Cảm ơn bạn đã đánh giá về khoá học !!!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(res => {
                    window.location.reload();
                })
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Đánh giá không thành công !!!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }).catch(err => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Đánh giá không thành công !!!',
                showConfirmButton: false,
                timer: 1500
            })
        })
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
                                {
                                    !validateCourse ? <Button
                                        onClick={handleRegisterCourse}
                                        type='button'
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}>
                                        Đăng ký
                                    </Button> :
                                        <Button
                                            onClick={() => history.push(`/courses/${params.id}/lessons`)}
                                            type='button'
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}>
                                            Bắt đầu học
                                        </Button>
                                }

                                <Button
                                    onClick={() => setOpenReview(true)}
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
            <DialogFeedbackCourse open={openReview} onClose={handleOnCloseReview} onSubmit={handleFeedback}></DialogFeedbackCourse>
        </div>
    );
}

export default CourseDetailPage;