import React from 'react';
import PropTypes from 'prop-types';
import { Card, makeStyles, CardMedia, CardContent, Typography, Avatar, Box, Button, Grid, Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import DeleteIcon from '@material-ui/icons/Delete';

ItemFavoriteCourseVertical.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: "100%",
        alignContent: "center",
        alignItems: "center",
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
        alignItems: 'center'
    },
    rating: {
        display: 'flex',
        alignItems: 'center'
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
    },
    button: {

    }
}));


function ItemFavoriteCourseVertical({ item, onRemove }) {
    const classes = useStyles();
    const history = useHistory();
    const handleRemove = e => {
        e.stopPropagation();
        onRemove(item._id);
    }
    return (
        <Paper
            elevation={3} className={classes.root} onClick={() => history.push(`/courses/${item._id}`)}>
            <Grid container>
                <Grid item xs={12} sm={2}>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        image={item.avatar}
                        className={classes.cover}>
                    </CardMedia>
                </Grid>
                <Grid item xs={12} sm={9}>
                    <CardContent className={classes.content}>
                        <Typography variant="h4" component="h4" className={classes.maxLineOne}>
                            <Box lineHeight={1} fontWeight="fontWeightBold">
                                {item.title}
                            </Box>
                        </Typography>
                        <Typography className={classes.maxLineTwo} variant="body2" component="p">{item.overview}</Typography>
                        <div className={classes.author}>
                            <Avatar aria-label="recipe" className={classes.small} src={item.lecturer_id.user_id.avatar}>
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
                            }} variant="body2" component="p">{item.count_rating}</Typography>
                        </div>
                        <Typography style={{
                            marginTop: '8px'
                        }} variant="body2" component="p">Level : {item.minimum_skill}</Typography>
                    </CardContent>
                </Grid>
                <Grid style={{ display: "flex", justifyContent: "flex-end" }} item xs={12} sm={1}>
                    <Button
                        onClick={handleRemove}
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}>
                        Xoá
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default ItemFavoriteCourseVertical;