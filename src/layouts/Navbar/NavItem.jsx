import { NavLink } from "react-router-dom";
import React from "react";

function NavItem({ name, iconClassName, linkTo }) {
  return (
    <li className='nav-item'>
      <NavLink exact to={linkTo} className='nav-link' activeClassName='active'>
        <span>
          {iconClassName && <i className={`me-2 ${iconClassName}`} />}
          {name}
        </span>
      </NavLink>
    </li>
  );
}

export default NavItem;
