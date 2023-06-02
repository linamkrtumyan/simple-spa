import { Component } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import Watch from "./Watch";

export default class Header extends Component {
  render() {
    return (
      <div className="header-2">
        <nav className="bg-neutral-100 py-2 md:py-4">
          <div className="container px-4 mx-auto md:flex md:items-center">
            <LanguageSwitcher />
            <Watch />
          </div>
        </nav>
      </div>
    );
  }
}

