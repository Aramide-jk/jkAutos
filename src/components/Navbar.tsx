import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Menu, X, Car } from "lucide-react";

const NavContainer = styled(motion.nav)<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  backdrop-filter: blur(1px);
  transition: all 0.3s ease;
  background: ${(props) =>
    props.$isScrolled ? "rgba(248, 247, 244, 0.95)" : ""};
  border-bottom: ${(props) =>
    props.$isScrolled ? "2px solid rgba(220, 38, 38, 0.1)" : "none"};
  color: ${(props) => (props.$isScrolled ? "white" : "blue")};

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const NavContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  text-decoration: none;

  .logo-icon {
    color: #dc2626;
  }
`;

const NavLinks = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    // background: rgba(248, 247, 244, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: center;
    padding-top: 6rem;
    gap: 1rem;
    transform: ${(props) =>
      props.$isOpen ? "translateX(0)" : "translateX(100%)"};
    transition: transform 0.3s ease;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  color: red;
  font-weight: 400;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: #dc2626;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${(props) => (props.$isActive ? "100%" : "0")};
    height: 2px;
    background: #dc2626;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const BookInspectionButton = styled(Link)`
  background: #dc2626;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    background: #b91c1c;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(220, 38, 38, 0.3);
  }
`;

const SignInButton = styled(Link)`
  background: transparent;
  color: #dc2626;
  padding: 0.5rem 1rem;
  border: 2px solid #dc2626;
  border-radius: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    background: #dc2626;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(220, 38, 38, 0.3);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  color: #2b2b2b;
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
    z-index: 1001;
    position: relative;
  }
`;

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/cars", label: "Cars" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <NavContainer
      $isScrolled={isScrolled}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}>
      <NavContent>
        <Logo to="/">
          <Car className="logo-icon" size={28} />
          jk_Autos
        </Logo>

        <NavLinks $isOpen={isMobileMenuOpen}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              $isActive={location.pathname === item.path}
              onClick={() => setIsMobileMenuOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </NavLinks>

        <NavButtons>
          <BookInspectionButton to="/book-inspection">
            Book Inspection
          </BookInspectionButton>
          <SignInButton to="/signin">Sign In</SignInButton>
        </NavButtons>

        <MobileMenuButton
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileMenuButton>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;
