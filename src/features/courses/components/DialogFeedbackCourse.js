import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { get, pick } from 'lodash';
import TextField from '@material-ui/core/TextField';
import { useForm } from 'react-hook-form';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function DialogFeedbackCourse({ open, onClose, onSubmit }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [title, setTitle] = useState();
    const [rating, setRating] = useState(2);

    const onHandleSubmit = () => {
        const body = {
            title: title,
            rating: rating
        }
        if (title) {
            setTitle();
            onSubmit(body);
        }
    }
    return (
        <Dialog fullWidth={true} onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={onClose}>
                Đánh giá khoá học
            </DialogTitle>
            <DialogContent dividers>
                <form>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Rating name="half-rating" defaultValue={2} precision={0.5} size="large" onChange={(event, newValue) => {
                            setRating(newValue);
                        }} />
                    </div>

                    <TextField
                        {...register("title", {
                            required: { value: true, message: 'Vui lòng nhập đánh giá !' },
                        })}
                        error={!title}
                        helperText={get(title, 'title.message', '')}
                        size="small"
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Đánh giá"
                        name="title"
                        type="text"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose} color="primary">
                    Huỷ
                </Button>

                <Button onClick={onHandleSubmit}
                    color="primary">
                    Đánh giá
                </Button>
            </DialogActions>
        </Dialog>
    );
}