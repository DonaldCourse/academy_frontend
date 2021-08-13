import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Player, BigPlayButton } from 'video-react';
import { makeStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import CourseServices from '../../../services/CourseServices';
import { useHistory, useRouteMatch } from 'react-router-dom';
import ItemLesson from '../components/ItemLesson';

CourseStudentPage.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
    },
    container: {
        display: 'flex',
    },
    scrollLesson: {
        overflow: 'auto',
        height: '-webkit-fill-available'
    }
}));

function CourseStudentPage(props) {
    const classes = useStyles();
    const { params } = useRouteMatch();
    const [lessons, setLessons] = useState([]);
    const [lessonSelected, setLessonSelected] = useState();
    const history = useHistory();
    const refPlayer = useRef(null);

    useEffect(() => {
        handleValidateCourse();
        getAllLesson();
    }, []);

    const getAllLesson = async () => {
        CourseServices.GetLessonsOfCourse(params.id).then(res => {
            if (res.status == 200) {
                setLessons(res.data.data.lessons);
                setLessonSelected(res.data.data.lessons[0]);
            }
        }).catch(err => {

        })
    }

    const handleOnClick = async item => {
        setLessonSelected(item);
        refPlayer.current.video.load();
    }

    const handleValidateCourse = async () => {
        try {
            CourseServices.CheckRegisterCourse(params.id).then(res => {
                if (res.status == 200) {
                    if (res.data.data == false) {
                        history.replace(`/courses/${params.id}`)
                    }
                }
            });
        } catch (error) {

        }
    }

    return (
        <div className={classes.root}>
            <Grid container className={classes.container}>
                <Grid item xs={12} sm={8} style={{ height: '100%' }}>
                    <Player
                        autoPlay
                        ref={refPlayer}
                        src={lessonSelected && process.env.REACT_APP_BASE_URL_CDN  + lessonSelected.video_url || ''}
                        fluid={false} height="100%" poster={lessonSelected && process.env.REACT_APP_BASE_URL_CDN  + lessonSelected.thumbnail}>
                        <BigPlayButton position="center" />
                    </Player>
                </Grid>
                <Grid className={classes.scrollLesson} item xs={12} sm={4}>
                    {
                        lessons && lessons.map((item, index) => {
                            return <ItemLesson key={index} lesson={item} onClick={handleOnClick}></ItemLesson>
                        })
                    }
                </Grid>
            </Grid>
        </div>

    );
}

export default CourseStudentPage;