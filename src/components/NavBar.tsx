import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Label.svg";
import { routes } from "../router";
import CurrencySelect from "./CurrencySelect";

const NavBar: FC = () => {
  return (
    <div className="nav-wrapper">
      <div className="nav-wrapper-container">
        <nav className="nav-bar">
          <NavLink to="/">
            <img src={Logo} className="logo" alt="Logo" />
          </NavLink>
          <ul className="nav-menu">
            {routes.map((item) => (
              <li className="nav-menu-item" key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <CurrencySelect />
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
