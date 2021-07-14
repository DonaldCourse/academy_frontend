import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SettingDrawer from './components/SettingDrawer';
import { Redirect, Route, Switch, useLocation, useHistory } from 'react-router-dom';
import TheFooter from "../../components/footer/TheFooter";
import TheHeader from "../../components/header/TheHeader";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';
import ProtectRouter from '../../routes/ProtectRouter';
const UpdatePassPage = React.lazy(() => import("./pages/UpdatePassPage"));
const MyCoursesPage = React.lazy(() => import("./pages/MyCoursesPage"));
const MyFavoriteCoursesPage = React.lazy(() => import("./pages/MyFavoriteCoursesPage"));
const UserProfilePage = React.lazy(() => import("./pages/UserProfilePage"));
SettingPage.propTypes = {

};
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        paddingTop: '64px'
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        width: "100%"
    },
}));

function SettingPage(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    return (
        <div>
            <TheHeader></TheHeader>
            <div className={classes.root}>
                <div className={classes.toolbar}>
                    <SettingDrawer open={open} onClose={() => setOpen(!open)}>
                    </SettingDrawer>
                </div>
                <main className={classes.content}>
                    <Switch>
                        <ProtectRouter component={UserProfilePage} path="/setting/profile" />
                        <ProtectRouter component={UpdatePassPage} path="/setting/change-password" />
                        <ProtectRouter component={MyCoursesPage} path="/setting/my-courses" />
                        <ProtectRouter component={MyFavoriteCoursesPage} path="/setting/my-favorite-courses" />
                        <Route path="/setting">
                            <Redirect to="/setting/profile" />
                        </Route>
                    </Switch>
                </main>
            </div>
            <TheFooter></TheFooter>
        </div>
    );
}

export default SettingPage;