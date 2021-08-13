import React from 'react';
import PropTypes from 'prop-types';
import { Card, makeStyles, CardMedia, CardContent, Typography, Avatar, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';

ItemCourseVerticalSmall.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: "100%",
        marginTop: theme.spacing(1),
        cursor: "pointer",
        pointerEvents: "auto"
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: theme.spacing(2)
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    author: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    },
    rating: {
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1)
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


function ItemCourseVerticalSmall({ item }) {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Card className={classes.root} onClick={() => history.replace(`/courses/${item._id}`)}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography variant="h4" component="h4" className={classes.maxLineOne}>
                        <Box lineHeight={1} fontWeight="fontWeightBold">
                            {item.title}
                        </Box>
                    </Typography>
                    <Typography className={classes.maxLineTwo} variant="body2" component="p">{item.overview}</Typography>
                    <div className={classes.author}>
                        <Avatar aria-label="recipe" className={classes.small} src={process.env.REACT_APP_BASE_URL_CDN  + item.lecturer_id.user_id.avatar}>
                        </Avatar>
                        <Typography style={{ marginLeft: '8px' }} variant="body2" component="p">{item.lecturer_id.user_id.name}</Typography>
                    </div>
                    <div className={classes.rating}>
                        <Typography variant="body2" component="p" style={{ color: '#be5a0e', fontWeight: 700, lineHeight: 1.2 }}>{item.rating}</Typography>
                        <Rating style={{
                            marginLeft: '8px'
                        }} name="half-rating-read" size="small" defaultValue={item.rating} precision={0.5} readOnly />
                        <Typography style={{
                            marginLeft: '8px'
                        }} variant="body2" component="p">({item.count_rating})</Typography>
                    </div>
                    <Typography style={{
                        marginTop: '8px'
                    }} variant="body2" component="p">Level : {item.minimum_skill}</Typography>
                </CardContent>
            </div>
        </Card>
    );
}

export default ItemCourseVerticalSmall;