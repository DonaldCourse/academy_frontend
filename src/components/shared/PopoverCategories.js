import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ItemPopoverCategories from './ItemPopoverCategories';
import { Button, Grid, Divider, IconButton } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
    popover: {
    },
    paper: {

    },
    divider: {
        border: 'none',
        width: 1,
        margin: 0,
        backgroundColor: '#eeeeee',
    },
    list: {
        width: "100%",
        maxWidth: 360,
        minWidth: 200,
        padding: 0
    },
    container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%"
    },
}));

export default function PopoverCategories(props) {
    const { anchorEl, handlePopoverClose, categories, onHandleSubmit } = props;
    const classes = useStyles();
    const open = Boolean(anchorEl);
    const [levelTwo, setLeveTwo] = useState([]);
    const [display, setDisplay] = useState('none');
    const [dense, setDense] = React.useState(false);

    const handleMouseEnter = (any) => {
        setLeveTwo(any);
        setDisplay('');
    }

    return (
        <div>
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
            >
                <Grid container
                    direction="row">
                    <Grid className={classes.container} item xs={12} sm={display !== "none" ? 6 : 12}>
                        <List dense={dense} className={classes.list}>
                            {categories && categories.map((item, index) => (
                                <div key={index}>
                                    <ListItem key={index} role={undefined} dense={false} button onClick={() => onHandleSubmit(item)} onMouseEnter={() => handleMouseEnter(item.childrens)}>
                                        <ListItemText id="title" primary={item.name} />
                                        <ListItemSecondaryAction>
                                            <IconButton size="medium" onClick={() => handleMouseEnter(item.childrens)}>
                                                <ArrowForwardIosIcon style={{ fontSize: "0.75rem" }} />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider></Divider>
                                </div>
                            ))}
                        </List>
                    <div className={classes.divider}></div>
                </Grid>
                <Grid item container xs={12} sm={6} style={{ display: `${display}` }}>
                    <List dense={dense} className={classes.list}>
                        {levelTwo && levelTwo.map((item, index) => (
                            <div key={index}>
                                <ListItem key={index} role={undefined} dense={false} button onClick={() => onHandleSubmit(item)}>
                                    <ListItemText id="title" primary={item.name} />
                                    <ListItemSecondaryAction>
                                        <IconButton size="medium">
                                            <ArrowForwardIosIcon style={{ fontSize: "0.75rem" }} />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider></Divider>
                            </div>
                        ))}
                    </List>
                </Grid>
                </Grid>
            </Popover>
        </div >
    );
}
