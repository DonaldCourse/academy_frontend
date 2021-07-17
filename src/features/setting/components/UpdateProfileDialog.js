import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import { Controller, useForm } from 'react-hook-form';

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

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        backgroundColor: '#ffffff',
        padding: theme.spacing(2),
    }
}));

UploadProfileDialog.propTypes = {

};

function UploadProfileDialog({ open, onClose, onSubmit, defaultValues }) {
    const classes = useStyles();
    const { control, register, handleSubmit, formState: { errors }, getValues, reset } = useForm({
        defaultValues: {
            name: defaultValues.name,
            email: defaultValues.email,
        }
    });

    const Submit = (data) => {
        const user_info = {
            name: getValues("name"),
            email: getValues("email")
        }
        onSubmit(user_info);
        reset();
    }

    return (
        <Dialog fullWidth={true} onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
            <DialogTitle id="customized-dialog-title" onClose={onClose}>
                Cập nhật ảnh đại diện
            </DialogTitle>
            <DialogContent dividers>
                <form onSubmit={handleSubmit(Submit)} className={classes.form} noValidate>
                    <Controller
                        control={control}
                        rules={{ required: { value: true, message: "Vui lòng nhập họ và tên !" } }}
                        name="name"
                        id="name"
                        render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState: { invalid, isTouched, isDirty, error },
                            formState,
                        }) => (
                            <TextField
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                                inputRef={ref}
                                error={!!errors.name}
                                helperText={get(errors, 'name.message', '')}
                                size="small"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                name="name"
                                label="Họ và tên"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        rules={{
                            pattern: { value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Email không tồn tại !' },
                            required: { value: true, message: 'Vui lòng nhập địa chỉ email !' },
                        }}
                        name="email"
                        type="email"
                        render={({
                            field: { onChange, onBlur, value, name, ref },
                            fieldState: { invalid, isTouched, isDirty, error },
                            formState,
                        }) => (
                            <TextField
                                onBlur={onBlur}
                                onChange={onChange}
                                value={value}
                                inputRef={ref}
                                error={!!errors.email}
                                helperText={get(errors, 'email.message', '')}
                                size="small"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                type="email"
                            />
                        )}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onClose} color="primary">
                    Huỷ
                </Button>

                <Button onClick={handleSubmit(Submit)}
                    color="primary">
                    Cập nhật
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UploadProfileDialog;