import React, { useState, useEffect } from 'react'
import './App.css'
import Stepper from './Stepper'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  iconHover: {
    fontSize: 70,
    margin: theme.spacing(2),
    '&:hover': {
      color: red[800],
    },
  },
  paper: {
    width: 100,
    margin: 20,
  }
}))

function App() {
  const classes = useStyles();
  const [isStarted, setIsStarted] = useState(false);
  return (
    <div className="App" className="App-header">
        {!isStarted &&
            <Paper className={classes.paper} onClick={()=>setIsStarted(true)}>
            <Typography variant="h5" component="h3">
                <Icon className={classes.iconHover} color="error">
                    local_cafe
                </Icon>
            </Typography>
        </Paper>}
        {isStarted && <Stepper callback={()=>setIsStarted(false)} />}
    </div>
  )
}

export default App
