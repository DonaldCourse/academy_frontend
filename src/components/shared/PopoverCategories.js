import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ItemPopoverCategories from './ItemPopoverCategories';
import { Button, Grid, Divider } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    popover: {
    },
    paper: {
        padding: theme.spacing(1),
    },
    divider : {
        border: 'none',
        width: 1,
        margin: 0,
        backgroundColor: '#eeeeee',
    }
}));

export default function PopoverCategories(props) {
    const { anchorEl, handlePopoverClose, categories } = props;
    const classes = useStyles();
    const open = Boolean(anchorEl);
    const [levelTwo, setLeveTwo] = useState([]);
    const [display, setDisplay] = useState('none');

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
                    <Grid item container xs={6}>
                        {categories && categories.map((item, index) => (
                            <Grid item xs={12}>
                                <Button key={index} onMouseEnter={() => handleMouseEnter(item.childs)}>
                                    <Typography>{item.title}</Typography>
                                </Button>
                            </Grid>
                        ))}
                    </Grid>

                    <Grid item container xs={6} style={{ display: `${display}` }}>
                        {levelTwo && levelTwo.map((item, index) => (
                            <Grid item xs={12}>
                                <Button key={index}>
                                    <Typography>{item.title}</Typography>
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Popover>
        </div>
    );
}
