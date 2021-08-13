import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Player, BigPlayButton } from 'video-react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "600px",
        height: "400px"
    }
}));

export default function PopupPreviewVideo({ open, onClose, lesson }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();

    return (
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={onClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{lesson.title}</DialogTitle>
                <DialogContent className={classes.root}>
                    <Player fluid={false} width="100%" height="100%" poster={process.env.REACT_APP_BASE_URL_CDN  + lesson.thumbnail}>
                        <BigPlayButton position="center" />
                        <source src={process.env.REACT_APP_BASE_URL_CDN  + lesson.video_url} />
                    </Player>
                </DialogContent>
            </Dialog>
    );
}
