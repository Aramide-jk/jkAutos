import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Car,
  User,
  Mail,
  Phone,
  CheckCircle,
  MessageSquare,
} from "lucide-react";
import Button from "../components/Button";
import api from "../services/api";

const BookingContainer = styled.div`
  min-height: 100vh;
  padding-top: 100px;
`;

const HeaderSection = styled.section`
  padding: 3rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #f8f7f4 0%, rgba(220, 38, 38, 0.1) 100%);
`;

const PageTitle = styled(motion.h1)`
  font-family: "Playfair Display", serif;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const PageSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
`;

const FormSection = styled.section`
  // padding: 4rem 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const FormContainer = styled(motion.div)`
  background: white;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: grid;
  gap: 2rem;
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
  transition: all 0.2s ease;
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

const Select = styled.select`
  padding: 1rem;
  border: 2px solid rgba(220, 38, 38, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  background: #f8f7f4;
  color: #2b2b2b;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    background: white;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 2px solid rgba(220, 38, 38, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s ease;
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

const DateTimeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 3rem;
  background: rgba(34, 197, 94, 0.05);
  border: 2px solid rgba(34, 197, 94, 0.2);
  border-radius: 20px;

  .success-icon {
    color: #22c55e;
    margin-bottom: 1rem;
  }

  h3 {
    font-family: "Playfair Display", serif;
    font-size: 2rem;
    color: #1a1a1a;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`;

const SelectedCarContainer = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  background: rgba(220, 38, 38, 0.05);
  padding: 1.5rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  align-items: center;
`;

const SelectedCarImage = styled.img`
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const SelectedCarInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectedCarName = styled.h4`
  font-family: "Playfair Display", serif;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
`;

const SelectedCarPrice = styled.p`
  color: #dc2626;
  font-weight: 600;
  font-size: 1.1rem;
  margin: 0;
`;

const BookInspection: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const preSelectedCarId = searchParams.get("car");
  const [cars, setCars] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    selectedCar: preSelectedCarId || "",
    date: "",
    time: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get("/cars");
        if (Array.isArray(response.data)) {
          setCars(response.data);
        } else {
          setCars([]);
        }
      } catch (error) {
        console.error("Failed to fetch cars for inspection booking:", error);
      }
    };

    fetchCars();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("hello");

    try {
      await api.post("/inspections", {
        ...formData,
        carId: formData.selectedCar,
      });
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to book inspection:", error);
      alert("Failed to book inspection. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  // Get tomorrow's date as minimum
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const selectedCarDetails = useMemo(() => {
    return cars.find((car) => car._id === formData.selectedCar);
  }, [cars, formData.selectedCar]);

  if (isSubmitted) {
    return (
      <BookingContainer>
        <FormSection>
          <SuccessMessage
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>
            <CheckCircle size={64} className="success-icon" />
            <h3>Inspection Booked Successfully!</h3>
            <p>
              Thank you for booking your inspection with jk_Autos. We've
              received your request and will contact you shortly to confirm the
              details. Our expert team will ensure your chosen vehicle meets our
              highest standards of luxury and quality.
            </p>
            <Button
              variant="primary"
              onClick={() => (window.location.href = "/cars")}>
              Continue Shopping
            </Button>
          </SuccessMessage>
        </FormSection>
      </BookingContainer>
    );
  }

  return (
    <BookingContainer>
      <HeaderSection>
        <PageTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          Book Vehicle Inspection
        </PageTitle>
        <PageSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}>
          Schedule a professional inspection with our certified luxury car
          experts
        </PageSubtitle>
      </HeaderSection>

      <FormSection>
        <FormContainer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}>
          {selectedCarDetails && (
            <SelectedCarContainer layout>
              <SelectedCarImage
                src={selectedCarDetails.images[0]}
                alt={selectedCarDetails.name}
              />
              <SelectedCarInfo>
                <SelectedCarName>
                  {selectedCarDetails.brand} {selectedCarDetails.name} (
                  {selectedCarDetails.year})
                </SelectedCarName>
                <SelectedCarPrice>
                  ₦{selectedCarDetails.price.toLocaleString()}
                </SelectedCarPrice>
              </SelectedCarInfo>
            </SelectedCarContainer>
          )}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="fullName">
                <User size={18} />
                Full Name
              </Label>
              <Input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="phone">
                <Phone size={18} />
                Phone Number
              </Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">
                <Mail size={18} />
                Email Address
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="selectedCar">
                <Car size={18} />
                Select Vehicle
              </Label>
              <Select
                id="selectedCar"
                name="selectedCar"
                value={formData.selectedCar}
                onChange={handleChange}
                required>
                <option value="">
                  {preSelectedCarId
                    ? "Vehicle pre-selected"
                    : "Choose a vehicle to inspect"}
                </option>
                {cars.map((car) => (
                  <option key={car._id} value={car._id}>
                    {car.brand} {car.name}
                  </option>
                ))}
              </Select>
            </FormGroup>

            <DateTimeGrid>
              <FormGroup>
                <Label htmlFor="date">
                  <Calendar size={18} />
                  Preferred Date
                </Label>
                <Input
                  type="date"
                  id="date"
                  name="date"
                  min={minDate}
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="time">
                  <Clock size={18} />
                  Preferred Time
                </Label>
                <Select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required>
                  <option value="">Select time slot</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </Select>
              </FormGroup>
            </DateTimeGrid>

            <FormGroup>
              <Label htmlFor="message">
                <MessageSquare size={18} />
                Additional Message (Optional)
              </Label>
              <TextArea
                id="message"
                name="message"
                placeholder="Any specific questions or requests? Let us know here."
                value={formData.message}
                onChange={handleChange}
              />
            </FormGroup>

            <Button
              type="submit"
              variant="primary"
              size="large"
              fullWidth
              disabled={isLoading}>
              {isLoading ? "Processing Your Request..." : "Book Inspection"}
            </Button>
          </Form>
        </FormContainer>
      </FormSection>
    </BookingContainer>
  );
};

export default BookInspection;
