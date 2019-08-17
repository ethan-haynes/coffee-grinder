import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 600,
    minWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    backgroundColor: 'light-grey'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    flexDirection: 'column'
  }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList(props) {
  const classes = useStyles();

  const chunkIt = arr => arr.reduce((all,one,i) => {
    const ch = Math.floor(i/3); 
    all[ch] = [].concat((all[ch]||[]),one); 
    return all
  }, [])

  const buildGrid = arr => (
    <Grid container spacing={3}>
        {arr.map( option => (
            <Grid item xs>
                <Paper className={classes.paper} onClick={props.onClick}>
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {option[0]}
                    </Avatar>
                    {option}
                </Paper>
            </Grid>
        ))}
    </Grid>
  )

  return (
    <div className={classes.root}>
      {chunkIt(props.options).map(options => (
        buildGrid(options) 
      ))}
    </div>
  );
}
