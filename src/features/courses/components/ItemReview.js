import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import moment from 'moment';

const useStyles = makeStyles({
    root: {
        display: 'flex'
    },
    content: {
        marginLeft: 16
    },
    containerRating: {
        display: 'flex',
        flexDirection: "row",
        alignContent: "center",
        marginTop: 8
    }
});

export default function ItemReview({ item }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar src={item.student_id.user_id.avatar} aria-label="recipe" className={classes.avatar}>
            </Avatar>
            <div className={classes.content}>
                <Typography variant="h4" component="h4">
                    <Box lineHeight={1} fontWeight="fontWeightBold">
                        {item.student_id.name}
                    </Box>

                    <div className={classes.containerRating}>
                        <Rating name="half-rating-read" size="small" value={item.rating} precision={0.5} readOnly />
                        <Typography style={{ marginLeft: '16px' }} variant="body1" component="p">{moment(item.created_at).format('MMMM Do YYYY')}</Typography>
                    </div>

                    <Typography style={{ marginTop: '16px' }} variant="body1" component="p">{item.title}</Typography></Typography>
            </div>
        </div>
    );
}
