import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CreditCard,
  Building2,
  Eye,
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Lock,
} from "lucide-react";
import api from "../services/api";
import Button from "../components/Button";

const CheckoutContainer = styled.div`
  min-height: 100vh;
  padding-top: 100px;
  background: #f8f7f4;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #dc2626;
  font-weight: 500;
  text-decoration: none;
  margin: 2rem;
  padding: 0.8rem 1.5rem;
  border: 2px solid #dc2626;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: #dc2626;
    color: white;
    transform: translateX(-5px);
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const MainSection = styled.div``;

const OrderSummary = styled.div`
  position: sticky;
  top: 120px;
  height: fit-content;

  @media (max-width: 1024px) {
    position: static;
    order: -1;
  }
`;

const SummaryCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
`;

const CarSummary = styled.div`
  border-bottom: 1px solid rgba(220, 38, 38, 0.2);
  padding-bottom: 2rem;
  margin-bottom: 2rem;
`;

const CarImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const CarTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const CarPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #dc2626;
  font-family: "Playfair Display", serif;
`;

const PriceBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PriceRow = styled.div<{ $isTotal?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${(props) => (props.$isTotal ? "1.3rem" : "1rem")};
  font-weight: ${(props) => (props.$isTotal ? "700" : "500")};
  color: ${(props) => (props.$isTotal ? "#1A1A1A" : "#666")};
  ${(props) =>
    props.$isTotal &&
    "border-top: 1px solid rgba(220, 38, 38, 0.2); padding-top: 1rem;"}
`;

const FormCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #dc2626;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

const Input = styled.input`
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

const PaymentOptions = styled.div`
  display: grid;
  gap: 1rem;
`;

const PaymentOption = styled.label<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 2px solid
    ${(props) => (props.$selected ? "#DC2626" : "rgba(220, 38, 38, 0.2)")};
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.$selected ? "rgba(220, 38, 38, 0.05)" : "transparent"};

  &:hover {
    border-color: #dc2626;
    background: rgba(220, 38, 38, 0.05);
  }

  input {
    margin: 0;
  }

  svg {
    color: #dc2626;
  }
`;

const SecurityNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(34, 197, 94, 0.05);
  padding: 1rem;
  border-radius: 12px;
  color: #166534;
  font-size: 0.9rem;
  margin-bottom: 1rem;

  svg {
    color: #22c55e;
  }
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

const Checkout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await api.get(`/cars/${id}`);
        setCar(response.data);
      } catch (err) {
        console.error("Failed to fetch car for checkout:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading || !car) {
    return (
      <CheckoutContainer>
        <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
          <h2>Car Not Found</h2>
          <Link to="/cars">
            <Button variant="primary">View All Cars</Button>
          </Link>
        </div>
      </CheckoutContainer>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (paymentMethod === "card") {
      navigate(`/payment/${id}`, {
        state: {
          formData,
          car,
          totalAmount,
        },
      });
      return;
    }

    try {
      await api.post("/purchases", {
        carId: car._id,
        ...formData,
        paymentMethod,
      });
      setIsCompleted(true);
    } catch (error) {
      console.error("Purchase failed:", error);
      // Here you would handle the error, maybe show a message to the user
    } finally {
      setIsProcessing(false);
    }
  };

  const taxAmount = Math.round(car.price * 0.08);
  const deliveryFee = 2500;
  const totalAmount = car.price + taxAmount + deliveryFee;

  if (isCompleted) {
    return (
      <CheckoutContainer>
        <ContentWrapper>
          <SuccessMessage
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}>
            <CheckCircle size={80} className="success-icon" />
            {paymentMethod === "inspection" ? (
              <>
                <h2>Booking Confirmed!</h2>
                <p>
                  Your order for the {car.brand} {car.carModel} is confirmed.
                  We'll contact you shortly to arrange the inspection and
                  finalize payment.
                </p>
              </>
            ) : (
              <>
                <h2>Purchase Complete!</h2>
                <p>
                  Congratulations on your purchase of the {car.brand}{" "}
                  {car.carModel}! We'll contact you shortly to arrange delivery
                  and finalize all paperwork. Welcome to the jk_Autos family.
                </p>
              </>
            )}
            <Button
              variant="primary"
              size="large"
              onClick={() => (window.location.href = "/cars")}>
              Continue Shopping
            </Button>
          </SuccessMessage>
        </ContentWrapper>
      </CheckoutContainer>
    );
  }

  return (
    <CheckoutContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <BackButton to={`/cars/${car._id}`}>
          <ArrowLeft size={20} />
          Back to Car Details
        </BackButton>

        <ContentWrapper>
          <CheckoutGrid>
            <MainSection>
              <FormCard>
                <SectionTitle>
                  <User size={24} />
                  Contact Information
                </SectionTitle>
                <Form onSubmit={handleSubmit}>
                  <FormRow>
                    <FormGroup>
                      <Label>
                        <User size={16} />
                        First Name
                      </Label>
                      <Input
                        type="text"
                        name="firstName"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Last Name</Label>
                      <Input
                        type="text"
                        name="lastName"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </FormRow>

                  <FormRow>
                    <FormGroup>
                      <Label>
                        <Mail size={16} />
                        Email
                      </Label>
                      <Input
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>
                        <Phone size={16} />
                        Phone
                      </Label>
                      <Input
                        type="tel"
                        name="phone"
                        placeholder="Enter phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </FormRow>

                  <FormGroup>
                    <Label>
                      <MapPin size={16} />
                      Address
                    </Label>
                    <Input
                      type="text"
                      name="address"
                      placeholder="Enter street address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>

                  <FormRow>
                    <FormGroup>
                      <Label>City</Label>
                      <Input
                        type="text"
                        name="city"
                        placeholder="Enter city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>State</Label>
                      <Input
                        type="text"
                        name="state"
                        placeholder="Enter state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </FormRow>

                  <FormGroup>
                    <Label>ZIP Code</Label>
                    <Input
                      type="text"
                      name="zipCode"
                      placeholder="Enter ZIP code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </FormGroup>
                </Form>
              </FormCard>

              <FormCard>
                <SectionTitle>
                  <CreditCard size={24} />
                  Payment Options
                </SectionTitle>

                <PaymentOptions>
                  <PaymentOption
                    $selected={paymentMethod === "card"}
                    onClick={() => setPaymentMethod("card")}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <CreditCard size={20} />
                    <span>Credit/Debit Card</span>
                  </PaymentOption>

                  <PaymentOption
                    $selected={paymentMethod === "bank"}
                    onClick={() => setPaymentMethod("bank")}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <Building2 size={20} />
                    <span>Bank Transfer</span>
                  </PaymentOption>

                  <PaymentOption
                    $selected={paymentMethod === "inspection"}
                    onClick={() => setPaymentMethod("inspection")}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="inspection"
                      checked={paymentMethod === "inspection"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <Eye size={20} />
                    <span>Pay on Inspection</span>
                  </PaymentOption>
                </PaymentOptions>

                <SecurityNotice>
                  <Lock size={16} />
                  Your payment information is encrypted and secure
                </SecurityNotice>

                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  fullWidth
                  disabled={isProcessing}
                  onClick={handleSubmit}>
                  {isProcessing ? (
                    "Processing Payment..."
                  ) : (
                    <>Complete Purchase - ₦{totalAmount.toLocaleString()}</>
                  )}
                </Button>
              </FormCard>
            </MainSection>

            <OrderSummary>
              <SummaryCard>
                <CarSummary>
                  <CarImage src={car.images[0]} alt={car.name} />
                  <CarTitle>{car.name}</CarTitle>
                  <CarPrice>₦{car.price.toLocaleString()}</CarPrice>
                </CarSummary>

                <PriceBreakdown>
                  <PriceRow>
                    <span>Vehicle Price</span>
                    <span>₦{car.price.toLocaleString()}</span>
                  </PriceRow>
                  <PriceRow>
                    <span>Tax & Registration</span>
                    <span>₦{taxAmount.toLocaleString()}</span>
                  </PriceRow>
                  <PriceRow>
                    <span>Delivery & Setup</span>
                    <span>₦{deliveryFee.toLocaleString()}</span>
                  </PriceRow>
                  <PriceRow $isTotal>
                    <span>Total Amount</span>
                    <span>₦{totalAmount.toLocaleString()}</span>
                  </PriceRow>
                </PriceBreakdown>
              </SummaryCard>
            </OrderSummary>
          </CheckoutGrid>
        </ContentWrapper>
      </motion.div>
    </CheckoutContainer>
  );
};

export default Checkout;
