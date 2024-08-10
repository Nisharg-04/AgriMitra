import React from 'react';
import './NavBar2.css';

function NavBar2() {
    return (
        <nav className="navbar2">
            <ul>
                <li><a href="/business">Business</a></li>
                <li><a href="/entertainment">Entertainment</a></li>
                <li><a href="/health">Health</a></li>
                <li><a href="/science">Science</a></li>
                <li><a href="/sports">Sports</a></li>
                <li><a href="/technology">Technology</a></li>
            </ul>
        </nav>
    );
}

export default NavBar2;
