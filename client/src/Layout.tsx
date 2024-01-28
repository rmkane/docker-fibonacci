import React from "react";
import { Link } from "react-router-dom";

import logo from "./assets/react.svg";

import "./Layout.css";

type LayoutProps = { children: React.ReactNode };

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="App-banner">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Fibbonaci Calculator</h1>
        </div>
        <nav className="App-nav">
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other Page</Link>
        </nav>
      </header>
      <main className="App-content">{children}</main>
    </div>
  );
};

export default Layout;
