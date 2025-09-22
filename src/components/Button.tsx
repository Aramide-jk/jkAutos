import React from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  fullWidth?: boolean;
}

const ButtonBase = styled(motion.button)<{
  $variant: string;
  $size: string;
  $fullWidth: boolean;
}>`
  border: none;
  border-radius: 16px;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Inter", sans-serif;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${(props) => {
    switch (props.$size) {
      case "small":
        return css`
          padding: 0.2rem 1rem;
          font-size: 0.9rem;
        `;
      case "large":
        return css`
          padding: 0.5rem 1rem;
          font-size: 1.1rem;
        `;
      default:
        return css`
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
        `;
    }
  }}

  ${(props) => {
    switch (props.$variant) {
      case "secondary":
        return css`
          background: #2b2b2b;
          color: white;

          &:hover:not(:disabled) {
            background: #1a1a1a;
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(43, 43, 43, 0.3);
          }
        `;
      case "outline":
        return css`
          background: transparent;
          color: #dc2626;
          border: 2px solid #dc2626;

          &:hover:not(:disabled) {
            background: #dc2626;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(220, 38, 38, 0.3);
          }
        `;
      default:
        return css`
          background: #dc2626;
          color: white;

          &:hover:not(:disabled) {
            background: #b91c1c;
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(220, 38, 38, 0.4);
          }
        `;
    }
  }}
`;

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  children,
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
}) => {
  return (
    <ButtonBase
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.98 }}>
      {children}
    </ButtonBase>
  );
};

export default Button;
