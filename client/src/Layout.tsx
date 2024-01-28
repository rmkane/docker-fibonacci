import React from "react";
import { Link } from "react-router-dom";

import logo from "./assets/react.svg";

type LayoutProps = { children: React.ReactNode };

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Fib Calculator</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/otherpage">Other Page</Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
