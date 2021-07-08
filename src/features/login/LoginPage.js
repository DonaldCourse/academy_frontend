import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Grid, InputAdornment, IconButton, Button, TextField, Typography, Paper } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { makeStyles } from '@material-ui/core/styles';
import { get, pick } from 'lodash';
import { useHistory } from "react-router-dom";
import AuthService from "../../services/AuthServices";
import { setAuth } from "../../reducer/AuthSlide";

LoginPgae.propTypes = {

};

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#ffffff',
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
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

function LoginPgae(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const history = useHistory();
    const onSubmit = data => {
        const user_info = pick(data, [
            'email',
            'password',
        ]);

        const body = {
            email: user_info.email,
            password: user_info.password
        }
        fetchLogin(body);

    };

    const fetchLogin = useCallback(async (data) => {
        AuthService.login(data).then(res => {
            if (res.status == 200) {
                console.log(res.data);
                window.localStorage.setItem("token", res.data.token);
                dispatch(setAuth(res.data.user));
                history.push('/')
            }
        }).catch(err => {

        })
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className={classes.root}>
            <Grid container xs={8} md={3} style={{ height: 350 }}>
                <Paper elevation={3}>
                    <form onSubmit={handleSubmit(onSubmit)} className={classes.form} noValidate>

                        <Typography className={classes.title}>Đăng nhập</Typography>

                        <TextField
                            {...register("email", {
                                required: 'Vui lòng nhập email đăng nhập !',
                            })}
                            error={!!errors.username}
                            helperText={get(errors, 'username.message', '')}
                            size="small"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Email"
                            name="email"
                            type="email"
                        />

                        <TextField
                            {...register("password", {
                                required: 'Vui lòng nhập mật khẩu !',
                            })}
                            error={!!errors.password}
                            helperText={get(errors, 'password.message', '')}
                            size="small"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Mật khẩu"
                            name="password"
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

                        <Button
                            type='submit'
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}>
                            Đăng nhập
                        </Button>

                        <a href="/forgot" className={classes.txt_forgot}>
                            Quên mật khẩu ?
                        </a>

                        <Grid container direction='row' className={classes.not_acc}>
                            <Typography className={classes.txt_not_acc}>
                                Bạn chưa có tài khoản?
                            </Typography>
                            <a href="/register" className={classes.txt_register}>
                                Đăng ký
                            </a>
                        </Grid>
                    </form>
                </Paper>
            </Grid>
        </div>
    );
}

export default LoginPgae;
