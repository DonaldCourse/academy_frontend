import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Grid, InputAdornment, IconButton, Button, TextField, Typography, Paper } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import { get, pick } from 'lodash';
import { Redirect, useHistory } from "react-router-dom";
import queryString from 'query-string';
import { useAuth } from '../../context/auth';
import Swal from 'sweetalert2';
import AuthServices from '../../services/AuthServices';

VerifyPassNewPage.propTypes = {};

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
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

function VerifyPassNewPage(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPWD, setShowConfirmPWD] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const search = queryString.parse(window.location.search);;
    const { auth, setAuth } = useAuth();
    const history = useHistory();

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
            'password',
        ]);

        const body = {
            password: user_info.password
        }

        validateAcc(body);
    }

    const validateAcc = async (body) => {
        AuthServices.resetPassword(body, search.token).then(res => {
            if (res.status == 200) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Xác nhận thành công !!!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(result => {
                    window.localStorage.setItem("token", res.data.token);
                    setAuth(res.data.user);
                    history.replace('/');
                });
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Xác nhận thất bại !!!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(res => {
                    history.replace('/');
                })
            }
        }).catch(err => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Xác nhận thất bại !!!',
                showConfirmButton: false,
                timer: 1500
            }).then(res => {
                history.replace('/');
            })
        })
    }

    const validateMatchedPass = (value) => {
        if (value != password || value != confirmPass) {
            return 'Vui lòng kiểm tra lại mật khẩu'
        }
    }

    return (
        <div className={classes.root}>
            <Grid container xs={8} sm={4}>
                <Paper elecation={3}>
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>
                        <Typography className={classes.title}>Cập nhật mật khẩu mới</Typography>

                        <TextField
                            {...register("password", {
                                required: 'Vui lòng nhập mật khẩu !',
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
                            label="Mật khẩu mới"
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
                                required: 'Vui lòng nhập mật khẩu !',
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
                            label="Xác nhận mật khẩu"
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
                            Cập nhật
                        </Button>

                        <a href="/forgot" className={classes.txt_forgot}>
                            Quên mật khẩu ?
                        </a>

                        <Grid container direction='row' className={classes.not_acc}>
                            <Typography className={classes.txt_not_acc}>
                                Bạn đã có tài khoản?
                            </Typography>
                            <a href="/login" className={classes.txt_register}>
                                Đăng nhập
                            </a>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </div>
    );
}

export default VerifyPassNewPage;
