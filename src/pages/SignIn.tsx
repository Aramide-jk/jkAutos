import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, CheckCircle } from "lucide-react";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const SignInContainer = styled.div`
  min-height: 100vh;
  padding-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f8f7f4 0%, rgba(220, 38, 38, 0.05) 100%);
`;

const FormWrapper = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 2rem;
`;

const FormCard = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Logo = styled.div`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;

  .logo-accent {
    color: #dc2626;
  }
`;

const Title = styled.h1`
  font-family: "Playfair Display", serif;
  font-size: 2rem;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
  text-align: left;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #dc2626;
  }
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid rgba(220, 38, 38, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f7f4;

  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    background: white;
  }

  &::placeholder {
    color: #999;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0;

  &:hover {
    color: #dc2626;
  }
`;

const ForgotPassword = styled.a`
  color: #dc2626;
  font-size: 0.9rem;
  text-align: right;
  margin-top: -0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const SignUpLink = styled.div`
  text-align: center;
  margin-top: 2rem;
  color: #666;

  a {
    color: #dc2626;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: rgba(34, 197, 94, 0.05);
  border: 2px solid rgba(34, 197, 94, 0.2);
  border-radius: 20px;

  .success-icon {
    color: #22c55e;
    margin-bottom: 1rem;
  }

  h3 {
    font-family: "Playfair Display", serif;
    font-size: 1.5rem;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;

const SignIn: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", formData);
      login(response.data.token);
      setIsSignedIn(true);
    } catch (err: any) {
      setError(
        err.response?.data?.message || "An error occurred during sign-in."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      // Redirect after a short delay to show the success message
      setTimeout(() => navigate("/"), 3000);
    }
  }, [isSignedIn, navigate]);

  if (isSignedIn) {
    return (
      <SignInContainer>
        <FormWrapper>
          <SuccessMessage
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>
            <CheckCircle size={48} className="success-icon" />
            <h3>Welcome Back!</h3>
            <p>
              You have successfully signed in to your jk_Autos account.
              Redirecting you to your dashboard...
            </p>
          </SuccessMessage>
        </FormWrapper>
      </SignInContainer>
    );
  }

  return (
    <SignInContainer>
      <FormWrapper>
        <FormCard
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          <Logo>
            jk_<span className="logo-accent">Autos</span>
          </Logo>
          <Title>Welcome Back</Title>
          <Subtitle>Sign in to your luxury car account</Subtitle>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">
                <Mail size={18} />
                Email Address
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">
                <Lock size={18} />
                Password
              </Label>
              <InputContainer>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <PasswordToggle
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </PasswordToggle>
              </InputContainer>
            </FormGroup>

            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}

            <ForgotPassword href="#">Forgot your password?</ForgotPassword>

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </Form>

          <SignUpLink>
            Don't have an account? <a href="#">Sign up here</a>
          </SignUpLink>
        </FormCard>
      </FormWrapper>
    </SignInContainer>
  );
};

export default SignIn;
