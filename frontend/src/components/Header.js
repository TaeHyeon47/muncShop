import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBox from "./SearchBox";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const [stickyNavbar, setStickyNavbar] = useState(false);
  const [searchBar, setSearchBar] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (window.screen.width >= 544) {
      setSearchBar(true);
    } else {
      setSearchBar(false);
    }
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
  };

  const changeStickyNav = () => {
    if (window.scrollY >= 80) {
      setStickyNavbar(true);
    } else {
      setStickyNavbar(false);
    }
  };

  const changeSearchBar = () => {
    if (window.screen.width >= 544) {
      setSearchBar(true);
    } else {
      setSearchBar(false);
    }
  };

  const changeMobileNav = () => {
    if (!mobileNav) {
      setMobileNav(true);
    } else {
      setMobileNav(false);
    }
  };

  window.addEventListener("scroll", changeStickyNav);
  window.addEventListener("resize", changeSearchBar);

  return (
    <Fragment>
      <div className="sub-nav">
        {userInfo && userInfo.isAdmin ? (
          <div className="sub-nav-list">
            <nav>
              <Link className="sub-nav-link" to="/profile">
                {userInfo.name}
              </Link>
            </nav>
            <nav>
              <Link className="sub-nav-link" to="/" onClick={logoutHandler}>
                로그아웃
              </Link>
            </nav>

            <nav>
              <div className="dropdown">
                <Link className="dropdown-text" to="#">
                  관리자
                  <ion-icon name="chevron-down-outline"></ion-icon>
                </Link>

                <ul className="dropdown-menu">
                  <li>
                    <Link className="sub-nav-link" to="/admin/userlist">
                      회원관리
                    </Link>
                  </li>
                  <li>
                    <Link className="sub-nav-link" to="/admin/productlist">
                      상품관리
                    </Link>
                  </li>
                  <li>
                    <Link className="sub-nav-link" to="/admin/orderlist">
                      주문관리
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        ) : userInfo ? (
          <ul className="sub-nav-list">
            <li>
              <Link className="sub-nav-link" to="/profile">
                {userInfo.name}
              </Link>
            </li>
            <li>
              <Link className="sub-nav-link" to="/" onClick={logoutHandler}>
                로그아웃
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="sub-nav-list">
            <li>
              <Link className="sub-nav-link" to="/login">
                로그인
              </Link>
            </li>
            <li>
              <Link className="sub-nav-link" to="/register">
                회원가입
              </Link>
            </li>
          </ul>
        )}
      </div>

      <header className={mobileNav ? "header nav-open" : "header"}>
        <nav className={stickyNavbar ? "main-nav activate" : "main-nav"}>
          <div className="main-nav-container">
            <Link
              className={stickyNavbar ? "logo-text activate" : "logo-text"}
              to="/"
            >
              munc
            </Link>
            {searchBar ? <SearchBox className="search-box" /> : ""}

            <ul className="main-nav-list">
              <li>
                <NavLink
                  className={
                    stickyNavbar ? "main-nav-link activate" : "main-nav-link"
                  }
                  to="/cart"
                >
                  <ion-icon
                    class="main-nav-icon"
                    name="cart-outline"
                  ></ion-icon>{" "}
                  <p> 카트 </p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={
                    stickyNavbar ? "main-nav-link activate" : "main-nav-link"
                  }
                  to="/profile"
                >
                  <ion-icon
                    class="main-nav-icon"
                    name="person-outline"
                  ></ion-icon>
                  <p> 마이뭉크 </p>
                </NavLink>
              </li>
            </ul>

            <button className={"btn-mobile-nav"} onClick={changeMobileNav}>
              <ion-icon class="icon-mobile-nav" name="menu-outline"></ion-icon>
            </button>
          </div>
        </nav>

        {/***********  
        모바일 네비게이션 
        ************/}
        <nav className="mobile-nav">
          <div className="mobile-nav-search">
            <Link className={"logo-text"} onClick={changeMobileNav} to="/">
              munc
            </Link>
            <button className="btn-mobile-nav" onClick={changeMobileNav}>
              <ion-icon class="icon-mobile-nav" name="close-outline"></ion-icon>
            </button>
          </div>
          <div className="mobile-searchbox">
            <SearchBox />
          </div>
          <div>
            {userInfo && userInfo.isAdmin ? (
              <div className="mobile-nav-text-section">
                <Link
                  className="mobile-nav-text"
                  onClick={changeMobileNav}
                  to="/profile"
                >
                  {userInfo.name}
                </Link>
                <Link
                  className="mobile-nav-text"
                  to="/"
                  onClick={logoutHandler}
                >
                  로그아웃
                </Link>
                <Link
                  className="mobile-nav-text"
                  onClick={changeMobileNav}
                  to="/admin/userlist"
                >
                  회원관리
                </Link>
                <Link
                  className="mobile-nav-text"
                  onClick={changeMobileNav}
                  to="/admin/productlist"
                >
                  상품관리
                </Link>
                <Link
                  className="mobile-nav-text"
                  onClick={changeMobileNav}
                  to="/admin/orderlist"
                >
                  주문관리
                </Link>
              </div>
            ) : userInfo ? (
              <div className="mobile-nav-text-section">
                <Link
                  className="mobile-nav-text"
                  onClick={changeMobileNav}
                  to="/profile"
                >
                  {userInfo.name}
                </Link>

                <Link
                  className="mobile-nav-text"
                  to="/"
                  onClick={logoutHandler}
                >
                  로그아웃
                </Link>
              </div>
            ) : (
              <div className="mobile-nav-text-section">
                <Link
                  className="mobile-nav-text"
                  onClick={changeMobileNav}
                  to="/login"
                >
                  로그인
                </Link>

                <Link
                  className="mobile-nav-text"
                  onClick={changeMobileNav}
                  to="/register"
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>
          <div>
            <div className="mobile-icon-container">
              <NavLink
                className="mobile-nav-text"
                onClick={changeMobileNav}
                to="/cart"
              >
                <ion-icon
                  class="mobile-nav-icon"
                  name="cart-outline"
                ></ion-icon>{" "}
                <p> 카트 </p>
              </NavLink>

              <NavLink
                className="mobile-nav-text"
                onClick={changeMobileNav}
                to="/profile"
              >
                <ion-icon
                  class="mobile-nav-icon"
                  name="person-outline"
                ></ion-icon>
                <p> 마이뭉크 </p>
              </NavLink>
            </div>
          </div>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
