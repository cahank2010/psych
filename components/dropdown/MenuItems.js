import React from 'react'
import {
    useState,
    useEffect,
    useRef} from "react";

import Dropdown from "./Dropdown";

import styles from "/src/pagestyle.module.css";

const MenuItems = ({
    items,
    depthLevel}) => {
  
    const [dropdown, setDropdown] = useState(false);

    let ref = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [dropdown]);

    const onMouseEnter = () => {window.innerWidth > 1920 && setDropdown(true);};

    const onMouseLeave = () => {window.innerWidth > 1920 && setDropdown(false);};

    return ( 
        <li 
        className={styles.menuItems}
        ref = {ref}
        onMouseEnter = {onMouseEnter}
        onMouseLeave = {onMouseLeave}>
        
        {
            items.submenu ? ( 
            <>
                <button type = "button"
                    aria-haspopup = "menu"
                    aria-expanded = {dropdown ? "true" : "false"}
                    onClick={() => setDropdown((prev) => !prev)}>
                    {
                        items.title
                        
                    } 
                    {
                        items.link
                    } 
                    {
                        depthLevel > 0 ? 
                        <span> &raquo; 
                        </span> : 
                        <span className={styles.arrow}/>
                    } 
                    </button> 
                    
                    <Dropdown
                    depthLevel = {depthLevel}
                    submenus = {items.submenu}
                    dropdown = {dropdown}>
                    </Dropdown>
             </>
            ) : 
            ( 
                <a href={items.link}> 
                {
                    items.title
                } 
                </a>
            )
        } 
        </li>
    );
};

export default MenuItems;