import React from "react";
import "./NavBar1.css";

function NavBar1() {
  return (
    <>
      {" "}
      <div className="latest-news">Latest News</div>
      <nav className="navbar1">
        <ul>
          <li>
            <a href="/agriculture">Agriculture</a>
          </li>
          <li>
            <a href="/farming">Farming</a>
          </li>
          <li>
            <a href="/crops">Crops</a>
          </li>
          <li>
            <a href="/fertilizer">Fertilizer</a>
          </li>
          <li>
            <a href="/pesticides">Pesticides</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar1;
