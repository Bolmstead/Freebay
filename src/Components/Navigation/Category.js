import React from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { v4 as uuid } from 'uuid';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Container from '@material-ui/core/Container';
import useStyles from './Stylings/styleCategory.js';


/** Material UI button that renders a drop down list of subCategories
 *  links when clicked on. Each link sends user to a <ProductList> 
 *  component displaying products of that subcategory.
 * 
 * - open: Boolean state that, when true, shows that the dropdown menu is open
 *  */

export default function Category({category, subCategories}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  // Material UI functionality to render menu dropdown of subcategories
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <Container>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{textTransform: "none", color: "#282828"}}
        >
          {category}
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList style={{ minWidth: "200px" }}autoFocusItem={open} 
                  id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {subCategories.map((item)=>{
                      return <Link id={uuid()} href={"/products?subCategory=" + item} 
                              style={{ textDecoration: 'none' }}>
                                <MenuItem style={{color: "#282828"}} id={uuid()} 
                                onClick={handleClose} >
                                  {item}
                                </MenuItem>
                             </Link>
                    })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Container>
    </div>
  );
}
