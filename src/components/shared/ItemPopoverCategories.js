import React, { useEffect } from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {

    },
    popover: {

    },
    paper: {
        padding: theme.spacing(1),
    },
}));

export default function ItemPopoverCategories(props) {
    const { title, childs } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [listChild, setListChild] = React.useState(childs);

    useEffect(() => {
        setListChild(childs);
    }, [childs])
    const handlePopoverOpen = (event) => {
        console.log(event);
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <Button
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}>
                <Typography>
                    {title}
                </Typography>
            </Button>
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}>
                {listChild && listChild.length > 0 && listChild.map((item) => (
                    <ItemPopoverCategories {...props} key={item.title} title={item.title} childs={item.childs}></ItemPopoverCategories>
                ))}
            </Popover>
        </div>
    );
}
