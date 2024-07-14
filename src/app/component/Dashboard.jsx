import React, { useState } from "react";
import {  signOut } from "next-auth/react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import HomeIcon from "@mui/icons-material/Home";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {
  Code,
  Collections,
  Contacts,
  Person,
  AccountCircle,
  Favorite,
  ShoppingCart,
} from "@mui/icons-material";  
import Link from "next/link";
;


function Dashboard({userImg, userName, userId}) {




  const [open, setOpen] = useState(false);


  

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        backgroundColor: "gray",
        padding: 4,
        height: 700,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <div
        style={{
          color: "white",
          fontSize: 40,
          backgroundImage: `url(${userImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "50%",
          width: 60,
          height: 60,
        }}
        className="mx-6 my-10"
      >
        {" "}
        <h1 className=" mx-20 text-lg text-white"> {userName}</h1>
      </div>
      <List>
        {/* <Link to="/">  */}
          <ListItemButton
          >
            <ListItem>
              <ListItemIcon>
                <HomeIcon style={{ color: "white" }} />
              </ListItemIcon>

              <ListItemText
                primary={"Home"}
                className="text-white hover:text-amber-300 
                transition ease-in-out duration-300
                hover:scale-125"
              />
            </ListItem>
          </ListItemButton>
        {/* </Link> */}

        {/* <Link to="/about"> */}
          <ListItemButton
          >
            <ListItem>
              <ListItemIcon>
                <Person style={{ color: "white" }} />
              </ListItemIcon>

              <ListItemText
                primary={"About"}
                className="text-white hover:text-amber-300 transition ease-in-out duration-300 hover:scale-125"
              />
            </ListItem>
          </ListItemButton>
        {/* </Link> */}

        <ListItemButton component={Link} href={`/favorites/${userId}`} passHref>
  <ListItem>
    <ListItemIcon>

      <Favorite style={{ color: "white" }} />
    </ListItemIcon>
    <ListItemText
      primary={"Fav Products"}
      className="text-white hover:text-amber-300 transition ease-in-out duration-300 hover:scale-125"
    />
  </ListItem>
</ListItemButton>

        

        {/* <Link to="/products"> */}
          <ListItemButton
          >
            <ListItem>
              <ListItemIcon>
                <ShoppingCart style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary={"My Cart"}
                className="text-white hover:text-amber-300 transition ease-in-out duration-300 hover:scale-125"
              />
            </ListItem>
          </ListItemButton>
        {/* </Link> */}

      </List>
      <Divider sx={{ backgroundColor: "white" }} />
      <List>
        {[
          {
            contact: "Contact",
            
            text: "Sign Out",
            icon: <Contacts />,
          },
        ].map((item, index) => (
          <ListItem style={{ marginLeft: "9%" }} key={index} disablePadding>
            {/* <Link to={item.link}> */}
            <div onClick={signOut}>
              <ListItemButton 
              >
                <ListItemIcon style={{ color: "white" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  className="text-white hover:text-amber-300 transition ease-in-out duration-300 hover:scale-125"
                  primary={item.text}
                />
              </ListItemButton>
              </div>
            {/* </Link> */}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
<div className="top-0 start-0 relative sticky p-4">
  <Button onClick={toggleDrawer(true)}>
    <MenuOpenIcon className="text-black" style={{ fontSize: '40px' }} />
  </Button>
  <Drawer open={open} onClose={toggleDrawer(false)}>
    {DrawerList}
  </Drawer>
</div>


  );
}

export default Dashboard;
