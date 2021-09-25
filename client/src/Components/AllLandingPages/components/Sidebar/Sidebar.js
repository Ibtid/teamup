import React from 'react'
import {FaTimes} from 'react-icons/fa'
import {Link as LinkS} from "react-scroll"
import {Link} from "react-router-dom"
import "./Sidebar.css"

const Sidebar = (props) => {

    const isOpenMessage = props.isOpen?"SidebarContainer isOpen":"SidebarContainer";

    return (
        <aside className={isOpenMessage} onClick={props.toggle}>
            <div className="Icon">
               <FaTimes className="CloseIcon"/> 
            </div>  
            <div className="SidebarWrapper">
                <div className="SidebarMenu">
                    <LinkS to="about" className="SidebarLink" onClick={props.toggle}>
                        About
                    </LinkS>
                    <LinkS to="discover" className="SidebarLink" onClick={props.toggle}>
                        Discover
                    </LinkS>
                    <LinkS to="services" className="SidebarLink" onClick={props.toggle}>
                        Services
                    </LinkS>
                    <LinkS to="signup" className="SidebarLink" onClick={props.toggle}>
                        Sign Up
                    </LinkS>
                </div>
                <div className="SideBtnWrap">
                        <Link to="/signin" className="SidebarRoute">Sign In</Link>
                </div>
            </div>          
        </aside>
    )
}

export default Sidebar
