import React from 'react';
import Link from '@material-ui/core/Link';
import { v4 as uuid } from 'uuid';
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

export default function MobileCategory({subCategories}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <MenuList style={{ minWidth: "200px" }}>
        {subCategories.map((item)=>{
            return <Link id={uuid()} 
                    href={"/products?subCategory=" + item} 
                    style={{ textDecoration: 'none' }}
                    >
                      <MenuItem style={{color: "#282828"}} id={uuid()}  >
                        {item}
                      </MenuItem>
                    </Link>
          })}
        </MenuList>
      </Container>
    </div>
  );
}
