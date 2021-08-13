import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { red } from '@material-ui/core/colors';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    cursor: "pointer",
    pointerEvents: "auto"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
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
    WebkitBoxOrient: 'vertical'
  }
}));

export default function ItemCourse({ course }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar} src={process.env.REACT_APP_BASE_URL_CDN + course.lecturer_id.user_id?.avatar}>
            R
          </Avatar>
        }
        title={course.lecturer_id.name}
        subheader={moment(course.created_at).format('MMMM Do YYYY')}
      />
      <CardMedia
        className={classes.media}
        image={process.env.REACT_APP_BASE_URL_CDN + course.avatar}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="h4" component="h4" className={classes.maxLineOne}>
          <Box lineHeight={1} fontWeight="fontWeightBold">
            {course.title}
          </Box>
        </Typography>
        <Typography className={classes.maxLineTwo} color="textSecondary" variant="body2" component="p">{course.overview}</Typography>
      </CardContent>
    </Card>
  );
}
