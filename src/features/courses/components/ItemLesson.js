import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
ItemLesson.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


function ItemLesson({ lesson, onClick }) {
    const classes = useStyles();

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>{lesson.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Button onClick={() => onClick(lesson)} color="primary" aria-label="upload picture" component="span"
                    startIcon={<PlayCircleOutlineIcon />}>
                    <Typography variant="body1" component="span" style={{ marginLeft: "8px" }}>
                        <Box>
                            Xem ngay
                        </Box>
                    </Typography>
                </Button>
            </AccordionDetails>
        </Accordion>
    );
}

export default ItemLesson;