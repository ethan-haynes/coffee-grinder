import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import List from './List';
import Recipe from './Recipe';
import Settings from './Settings';
import AddOn1 from './AddOn1';
import AddOn2 from './AddOn2';

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: 'red',
    },
  },
  completed: {
    '& $line': {
      borderColor: 'red',
    },
  },
  disabled: {
    '& $line': {
      borderColor: '#eaeaf0',
    },
  },
  line: {
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: 'red',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: 'red',
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
    </div>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  rootButtons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    textAlign: 'center',
    fontSize: 24,
  },
}));

function getSteps() {
  return ['coffee type', 'bean type', 'coffee maker'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}
function getStepList(step) {
  switch (step) {
    case 0:
      return ['Turkish', 'Espresso', 'Paper Filter', 'Metal Filter', 'French Press'];
    case 1:
      return ['Taste of Austin', 'Cocout Run', 'Breakfast', 'Other'];
    case 2:
      return ['Brville', "De'Longhi", 'Mr. Coffee', 'La Pavni', 'Saeco'];
    default:
      return [];
  }
}
export default function CustomizedSteppers(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  function handleReset() {
    props.callback()
    setActiveStep(0);
  }

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classes.rootButtons}>
        {activeStep === steps.length ? (
          <span>
            <Typography className={classes.instructions}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Settings />
                </Grid>
                <Grid item xs>
                  <Typography className={classes.instructions}>
                  Settings For A Perfect Grind 
                  </Typography>
                </Grid>
            </Grid>
              <Grid container spacing={3}>
                <Grid item xs>
                  <Typography className={classes.instructions}>
                  A Recipe Picked For You 
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Recipe />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={11}>
                  <Typography className={classes.instructions}>
                    Try it with 
                  </Typography>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs>
                  <AddOn1 />
                </Grid>
                <Grid item xs>
                  <AddOn2 />
                </Grid>
            </Grid>
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </span>
        ) : (
          <div> 
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <List onClick={handleNext} options={getStepList(activeStep)} />
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Back
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
