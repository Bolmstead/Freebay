import React from "react";
import HomePagePic from './HomePagePic';


const homePagePic1 = <HomePagePic linkRoute={"/products?subCategory=Pet+Supplies"} titleText={"New Goals. Cheap Gear."} subText={"Bid for home workout equipment here "} imgHref={"/Images/workout.jpg"}/>

const homePagePic2 = <HomePagePic linkRoute={"/products?subCategory=Sports+and+Hobbies"} titleText={"The Best Tech. For Less."} subText={"Get the newest gadgets here" } imgHref={"/Images/electronics.jpg"}/>

const homePagePic3 = <HomePagePic linkRoute={"/products?subCategory=Pet+Supplies"} titleText={"Running Low on Kitty Litter?"} subText={"Hurry and grab it now!"} imgHref={"/Images/kitten.jpg"}/>

let homePagePics = [homePagePic1, homePagePic2, homePagePic3]

export default homePagePics
