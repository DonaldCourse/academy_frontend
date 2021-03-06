import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useForm } from "react-hook-form";
import { Grid, InputAdornment, IconButton, Button, TextField, Typography, Paper } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import { get, pick } from 'lodash';
import { Redirect, useHistory } from "react-router-dom";
import AuthServices from '../../../services/AuthServices'
import Swal from 'sweetalert2';
import { useAuth } from "../../../context/auth";

UpdatePassPage.propTypes = {};

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        backgroundColor: '#ffffff',
        padding: theme.spacing(2),
    },

    submit: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        height: 38,
        width: '100%', // Fix IE 11 issue.
    },

    submit_fb: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        marginTop: theme.spacing(2),
        height: 38,
        width: '100%', // Fix IE 11 issue.
        border: '1px solid',
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.75,
        borderRadius: 3,
        boxShadow: theme.boxShadow,
        backgroundColor: '#ffffff',
    },

    submit_gg: {
        width: '100%',
        height: 38,
        fontSize: 14,
        fontWeight: 500,
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        marginTop: theme.spacing(2),
        backgroundColor: '#ffffff',
        textTransform: 'inherit',
        '&:hover': {
            backgroundColor: '#ffffff',
        },
        border: '1px solid',
    },

    txt_not_acc: {
        fontSize: 16,
        fontWeight: 500,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        color: 'rgba(0, 0, 0, 0.85)'
    },

    txt_register: {
        fontSize: 16,
        fontWeight: 500,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        marginLeft: theme.spacing(1),
        color: '#2f8c92',
    },

    not_acc: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center'
    },

    txt_forgot: {
        fontSize: 12,
        fontWeight: 500,
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: 'normal',
        marginLeft: theme.spacing(1),
        color: '#2f8c92',
    },

    title: {
        fontSize: 18,
        display: 'flex',
        fontWeight: 500,
        justifyContent: 'center'
    }

}));

function UpdatePassPage(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPWD, setShowConfirmPWD] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const history = useHistory();
    const { auth, setAuth } = useAuth();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPWD(!showConfirmPWD);
    }


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = data => {
        const user_info = pick(data, [
            'currentPassword',
            'password',
        ]);

        const body = {
            currentPassword: user_info.currentPassword,
            password: user_info.password
        }

        updatePassword(body);
    }

    const updatePassword = async (body) => {
        try {
            AuthServices.updatePassword(body).then(res => {
                if (res.status == 200) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'C???p nh???t m???t kh???u th??nh c??ng !!!',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(result => {
                        window.localStorage.setItem("token", res.data.token);
                        setAuth(res.data.user);
                        window.location.reload();
                    });
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'C???p nh???t m???t kh???u th???t b???i !!!',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(res => {

                    })
                }
            }).catch(err => {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'C???p nh???t m???t kh???u th???t b???i !!!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(res => {

                })
            })
        } catch (error) {

        }
    }

    const validateMatchedPass = (value) => {
        if (value != password || value != confirmPass) {
            return 'Vui l??ng ki???m tra l???i m???t kh???u'
        }
    }

    return (
        <div className={classes.root}>
            <Grid container xs={8} sm={4}>
                <Paper elecation={3}>
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
                        <Typography className={classes.title}>C???p nh???t m???t kh???u</Typography>

                        <TextField
                            {...register("currentPassword", {
                                required: 'Vui l??ng nh???p m???t kh???u !',
                            })}
                            error={!!errors.currentPassword}
                            helperText={get(errors, 'currentPassword.message', '')}
                            size="small"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="currentPassword"
                            label="M???t kh???u c??"
                            name="currentPassword"
                            onChange={e => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end">
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />

                        <TextField
                            {...register("password", {
                                required: 'Vui l??ng nh???p m???t kh???u !',
                                validate: value => validateMatchedPass(value)
                            })}
                            error={!!errors.password}
                            helperText={get(errors, 'password.message', '')}
                            size="small"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="M???t kh???u m???i"
                            name="password"
                            onChange={e => setPassword(e.target.value)}
                            type={showPassword ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end">
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />

                        <TextField
                            {...register("confirmpwd", {
                                required: 'Vui l??ng nh???p m???t kh???u !',
                                validate: value => validateMatchedPass(value)
                            })}
                            error={!!errors.confirmpwd}
                            helperText={get(errors, 'confirmpwd.message', '')}
                            size="small"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="confirmpwd"
                            label="X??c nh???n m???t kh???u"
                            name="confirmpwd"
                            type={showConfirmPWD ? 'text' : 'password'}
                            onChange={e => setConfirmPass(e.target.value)}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleClickShowConfirmPassword}
                                        edge="end">
                                        {showConfirmPWD ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />

                        <Button
                            type='submit'
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            C???p nh???t
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </div>
    );
}

export default UpdatePassPage;
