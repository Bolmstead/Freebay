import React, { useState, useContext, useEffect } from "react";
import { fade, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  balance: {
    color: "#282828",
    justifyContent: "center",
    flexDirection: "column",
    display: "flex"
  },
  flexbox: {
    display: "flex"
  },
  logo: {
    width: "150px"
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    textTransform: 'none',
    color: '#282828'	
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.07),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.12),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    flex: 3,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(.65, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
  inputRoot: {
    color: 'black',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
  flex: {
      display: 'flex',
    },
  searchButton: {
    background: 'none',
    padding: '0px',
    border: 'none',
  },

  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  sectionDesktop: {
    display: 'flex',
  },


}));

export default useStyles;