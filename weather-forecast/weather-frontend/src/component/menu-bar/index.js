import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
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
  title: {
    flexGrow: 1,
  },
  alignButtons: {
    display:'flex',
    justifyContent: 'space-between'
  }
}));

export default function MenuAppBar(props) {
  const classes = useStyles();
  const { searchFunc, title, searchBar } = props;
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = React.useState(false);
  const [city, setCity] = useState('')
  const [popup, setPopup] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleKeyPress = (event) => {
    const inputAuth = new RegExp("[A-Za-z]+");
    if (event.keyCode === 13) {
      if (city && inputAuth.test(city)) {
        searchFunc(city) 
      } else {
        alert("Please enter correct city name (in English)")
      }
    }
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setAuth(false)
  };

  const handleClickOpen = () => {
    setPopup(true);
  };
  const handlePopupClose = () => {
    setPopup(false);
  };

  const navigateToGithubAuth = () => {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=3cd93fc45fbf1e825e96&state=demo'
    handlePopupClose();
  }

  const navigateToOtherPage = (page) => {
    handleClose();
    window.location.href = page;
  }

  return (
    <div className={classes.root}>
      <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {searchBar && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search cities"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={event => setCity(event.target.value)}
                onKeyDown={handleKeyPress}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          )}
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => navigateToOtherPage('profile')}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
          {!auth && (
            <Button color="inherit" onClick={handleClickOpen}>Login</Button>
          )}
        </Toolbar>
      </AppBar>
      <Dialog open={popup} onClose={handlePopupClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Log in</DialogTitle>
        <DialogContent>
          <Button onClick={navigateToGithubAuth} color="secondary" variant="contained" fullWidth={true}>
            Login with Github
          </Button>
          <Button onClick={handlePopupClose} color="primary" fullWidth={true}>
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
