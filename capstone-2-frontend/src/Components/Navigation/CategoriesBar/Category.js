import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import { ListItemIcon } from '@material-ui/core';
import { v4 as uuid } from 'uuid';


export default function Category({category, subCategories}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true"  onClick={handleClick}>
        {category}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          {subCategories.map((item)=>{
            return <Link id={uuid()} href={"/products/category/" + item}><MenuItem id={uuid()} onClick={handleClose}>{item}</MenuItem></Link>
          })}
      </Menu>
    </div>
  );
}
