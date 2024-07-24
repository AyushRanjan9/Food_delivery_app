import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import logo from "../../assets/images/res-logo.png";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";
import "../../styles/header.css";

const nav__links = [
  {
    display: "Home",
    path: "/home",
  },
  {
    display: "Foods",
    path: "/pizzas",
  },
  {
    display: "Cart",
    path: "/cart",
  },
  {
    display: "Contact",
    path: "/contact",
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const toggleLoginModal = () => setShowLoginModal(!showLoginModal);
  const navigate = useNavigate();

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");

  const toggleCart = () => {
    dispatch(cartUiActions.toggle());
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    });

    return () => window.removeEventListener("scroll");
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo" onClick={() => navigate("/home")}>
            <img src={logo} alt="logo" />
            <h5>Tasty Treat</h5>
          </div>
          {/* ======= menu ======= */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div
              className="menu d-flex align-items-center gap-5"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="header__closeButton">
                <span onClick={toggleMenu}>
                  <i className="ri-close-fill"></i>
                </span>
              </div>
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
                  onClick={toggleMenu}
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </div>

          {/* ======== nav right icons ========= */}
          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon" onClick={toggleCart}>
              <i className="ri-shopping-basket-line"></i>
              <span className="cart__badge">{totalQuantity}</span>
            </span>
            
            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
            
            <span className="login__button" onClick={toggleLoginModal}>
              <NavLink to="/login" activeClassName="active__menu">
                Login
              </NavLink>
            </span>
          </div>
        </div>
      </Container>

      {/* Login Modal */}
      <Modal isOpen={showLoginModal} toggle={toggleLoginModal}>
        <ModalHeader toggle={toggleLoginModal}>Login</ModalHeader>
        <ModalBody>
          {/* Your login form can go here */}
          <form>
            <label>Email:</label>
            <input type="email" />
            <label>Password:</label>
            <input type="password" />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleLoginModal}>Login</Button>{' '}
          <Button color="secondary" onClick={toggleLoginModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </header>
  );
};

export default Header;
