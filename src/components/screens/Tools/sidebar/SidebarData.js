import React from "react"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
export const SidebarData = [
    {
        title:"Home",
        path:"/home",
        icon:<AiIcons.AiOutlineHome />,
        cName:"nav-text"
    },
    {
        title:"View Books",
        path:"/viewbooks",
        icon:<FaIcons.FaBook />,
        cName:"nav-text"
    },
    {
        title:"Checkout Book",
        path:"/checkoutbooks",
        icon:<AiIcons.AiOutlineArrowRight/>,
        cName:"nav-text"
    },
    {
        title:"Check Deadlines",
        path:"/checkdeadlines",
        icon:<AiIcons.AiOutlineHourglass/>,
        cName:"nav-text"
    },
    {
        title:"History",
        path:"/history",
        icon:<AiIcons.AiOutlineHistory />,
        cName:"nav-text"
    },

];