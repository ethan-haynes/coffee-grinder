import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 600,
    minWidth: 600,
    backgroundColor: theme.palette.background.paper,
  },
  avatar: {
    backgroundColor: 'light-grey'
  }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SimpleList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        { props.options.map( option => (
        <span>    
            <ListItem button alignItems onClick={props.onClick}>
              <ListItemIcon>
                <Avatar aria-label="recipe" className={classes.avatar}>
                    {option[0]}
                </Avatar>
              </ListItemIcon>
                <ListItemText primary={option} />
            </ListItem>
            <Divider component="li" />
        </span>
        ))}
      </List>
    </div>
  );
}
