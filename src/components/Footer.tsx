import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Car,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";

const FooterContainer = styled.footer`
  background: #f8f7f4;
  border-top: 1px solid rgba(220, 38, 38, 0.2);
  padding: 3rem 2rem 1rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-family: "Playfair Display", serif;
    color: #1a1a1a;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }

  p {
    color: #2b2b2b;
    margin-bottom: 0.5rem;
    line-height: 1.8;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;

  .logo-icon {
    color: #dc2626;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const Tagline = styled.p`
  font-style: italic;
  color: #dc2626 !important;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
`;

const FooterLink = styled(Link)`
  color: #2b2b2b;
  display: block;
  margin-bottom: 0.8rem;
  transition: color 0.3s ease;

  &:hover {
    color: #dc2626;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.8rem;
  color: #2b2b2b;

  svg {
    color: #dc2626;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
    gap: 3rem;
  }
`;

const SocialIcon = styled(motion.a)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(220, 38, 38, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dc2626;
  transition: all 0.3s ease;

  &:hover {
    background: #dc2626;
    color: white;
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(220, 38, 38, 0.2);
  color: #2b2b2b;
  font-size: 0.9rem;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <Logo>
              <Car className="logo-icon" size={28} />
              jk_Autos
            </Logo>
            <Tagline>Luxury on Wheels. Curated for You.</Tagline>
            <p>
              Experience the finest selection of luxury vehicles, carefully
              curated for the discerning automotive enthusiast. Where excellence
              meets elegance.
            </p>
            <SocialIcons>
              <SocialIcon
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                <Instagram size={18} />
              </SocialIcon>
              <SocialIcon
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                <Facebook size={18} />
              </SocialIcon>
              <SocialIcon
                href="#"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                <Twitter size={18} />
              </SocialIcon>
            </SocialIcons>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <FooterLink to="/cars">View Cars</FooterLink>
            <FooterLink to="/book-inspection">Book Inspection</FooterLink>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
          </FooterSection>

          <FooterSection>
            <h3>Services</h3>
            <p>Car Sales</p>
            <p>Vehicle Inspection</p>
            <p>Financing Options</p>
            <p>Trade-In Programs</p>
            <p>After Sales Support</p>
          </FooterSection>

          <FooterSection>
            <h3>Contact Info</h3>
            <ContactInfo>
              <Phone size={18} />
              <span>+1 (555) 123-4567</span>
            </ContactInfo>
            <ContactInfo>
              <Mail size={18} />
              <span>info@jk-autos.com</span>
            </ContactInfo>
            <ContactInfo>
              <MapPin size={18} />
              <span>123 Luxury Ave, City Center</span>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <p>
            &copy; 2024 jk_Autos. All rights reserved. | Privacy Policy | Terms
            of Service
          </p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
