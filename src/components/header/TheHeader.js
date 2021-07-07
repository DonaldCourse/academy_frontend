import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Hidden from '@material-ui/core/Hidden';
import tingtong from '../../assets/icons/tingtong_text.png'
import { Button } from '@material-ui/core';
import PopoverCategories from '../shared/PopoverCategories';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        border: '1px solid',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

const categories = [
    {
        title: "Donald 1",
        childs: [
            {
                title: "Donald 2",
            },
            {
                title: "Donald 3",
            }
        ]
    },

    {
        title: "Donald 4",
        childs: [
            {
                title: "Donald 5",
            },
            {
                title: "Donald 6",
            }
        ]
    },

    {
        title: "Donald 7",
        childs: [
            {
                title: "Donald 8",
            },
            {
                title: "Donald 9",
            }
        ]
    },

    {
        title: "Donald 10",
        childs: [
            {
                title: "Donald 11",
            },
            {
                title: "Donald 12",
            }
        ]
    }
]

export default function TheHeader() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorPopover, setAnchorPopover] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const auth = useSelector(state => state.auth);
    const history = useHistory();

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handlePopoverOpen = (event) => {
        console.log(event);
        setAnchorPopover(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorPopover(null);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <p>Profile</p>
            </MenuItem>
            {
                !auth && <MenuItem>
                    <p>Đăng nhập</p>
                </MenuItem>
            }

            {
                !auth && <MenuItem>
                    <p>Đăng ký</p>
                </MenuItem>
            }
        </Menu>
    );

    const renderComponentLogin = () => {
        if (auth) {
            return (
                <div>
                    <div className={classes.sectionDesktop}>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div className={classes.sectionDesktop}>
                    <Button
                        style={{ marginRight: "16px" }}
                        onClick={() => history.push("/login")}
                    >
                        Đăng nhập
                    </Button>
                    <Button
                        onClick={() => history.push("/register")}
                        variant="contained"
                        color="primary"
                    >
                        Đăng ký
                    </Button>
                </div>

            </div>
        )
    }
    return (
        <div className={classes.grow}>
            <AppBar position="static" style={{ backgroundColor: '#ffffff', color: 'darkgray', position: 'fixed' }}>
                <Toolbar>
                    <Hidden xsDown>
                        <a href="/">
                            <img style={{ "height": 50 }} src={tingtong} className={classes.title}></img>
                        </a>
                    </Hidden>

                    <Button onClick={handlePopoverOpen} onMouseEnter={handlePopoverOpen} style={{ marginLeft: "16px" }} color="default">
                        <Typography variant="h5" component="p">Danh mục</Typography>
                    </Button>

                    <div style={{ display: "inherit", position: "relative" }}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                    </div>

                    <div className={classes.grow} />
                    {renderComponentLogin()}
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            <div onMouseLeave={handlePopoverClose}>
                <PopoverCategories categories={categories} anchorEl={anchorPopover} handlePopoverClose={handlePopoverClose}></PopoverCategories>
            </div>
        </div>
    );
}
