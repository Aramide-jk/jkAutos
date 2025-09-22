import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { usePaystackPayment } from "react-paystack";
import { CheckCircle } from "lucide-react";
import Button from "../components/Button";
import api from "../services/api";

const PaymentContainer = styled.div`
  min-height: 100vh;
  padding-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f7f4;
`;

const FormWrapper = styled(motion.div)`
  max-width: 500px;
  width: 100%;
  padding: 2rem;
`;

const FormCard = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const OrderSummary = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(220, 38, 38, 0.1);
  text-align: center;

  h4 {
    font-family: "Playfair Display", serif;
    font-size: 1.2rem;
    color: #2b2b2b;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.8rem;
    font-weight: 700;
    color: #dc2626;
    margin: 0;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;

  .success-icon {
    color: #22c55e;
    margin-bottom: 1.5rem;
  }

  h2 {
    font-family: "Playfair Display", serif;
    font-size: 2.5rem;
    color: #1a1a1a;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Payment: React.FC = () => {
  useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, car, totalAmount } = location.state || {};

  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!formData || !totalAmount) {
      navigate("/cars", { state: { message: "Invalid checkout session." } });
    }
  }, [formData, totalAmount, navigate]);

  // --- Paystack Configuration ---
  const config = {
    reference: new Date().getTime().toString(),
    email: formData.email,
    amount: totalAmount * 100, // Amount in kobo
    publicKey: "sk_test_c7c6991c46e980fcdea8932c7409471ca8239e9c",
  };

  const onSuccess = (reference: any) => {
    // Payment was successful, now record the purchase on the backend
    api
      .post("/purchases", {
        carId: car._id,
        ...formData,
        paymentMethod: "card",
        paymentReference: reference.reference,
      })
      .then(() => {
        setIsCompleted(true);
      })
      .catch((error) => {
        console.error("Purchase failed on backend:", error);
        alert(
          "Payment was successful but we couldn't confirm your order. Please contact support."
        );
      })
      .finally(() => setIsProcessing(false));
  };

  const onClose = () => {
    // User closed the Paystack modal
    setIsProcessing(false);
  };

  const initializePayment = usePaystackPayment(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    initializePayment({ onSuccess, onClose });
  };

  if (!car) {
    return (
      <PaymentContainer>
        <div>Loading or invalid navigation...</div>
      </PaymentContainer>
    );
  }

  if (isCompleted) {
    return (
      <PaymentContainer>
        <SuccessMessage
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}>
          <CheckCircle size={80} className="success-icon" />
          <h2>Payment Successful!</h2>
          <p>
            Congratulations on your purchase of the {car.brand} {car.name}!
            We'll contact you shortly to arrange delivery and finalize all
            paperwork.
          </p>
          <Button
            variant="primary"
            size="large"
            onClick={() => navigate("/cars")}>
            Continue Shopping
          </Button>
        </SuccessMessage>
      </PaymentContainer>
    );
  }

  return (
    <PaymentContainer>
      <FormWrapper
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <FormCard>
          <SectionTitle>Secure Card Payment</SectionTitle>
          <OrderSummary>
            <h4>
              {car.brand} {car.name}
            </h4>
            <p>₦{totalAmount.toLocaleString()}</p>
          </OrderSummary>
          <Form onSubmit={handleSubmit}>
            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              disabled={isProcessing}>
              {isProcessing
                ? "Processing..."
                : `Pay ₦${totalAmount.toLocaleString()}`}
            </Button>
          </Form>
        </FormCard>
      </FormWrapper>
    </PaymentContainer>
  );
};

export default Payment;
