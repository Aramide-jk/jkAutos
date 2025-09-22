import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Eye, Calendar, Fuel, Settings } from "lucide-react";
import Button from "./Button";

interface Car {
  _id: string;
  brand: string;
  name: string;
  price: number;
  year: number;
  mileage: string;
  fuelType: string;
  transmission: string;
  images: string[];
  condition: string;
  description: string;
}

interface CarCardProps {
  car: Car;
  index?: number;
}

// Format prices to  Naira

const formatMileage = (mileage: string): string => {
  const numericMileage = parseInt(mileage, 10);
  if (isNaN(numericMileage)) {
    // Return original string or a default if it's not a valid number
    return mileage;
  }
  return numericMileage.toLocaleString();
};

const CardContainer = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 260px;
  overflow: hidden;
`;

const CarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 60%,
    rgba(0, 0, 0, 0.3) 100%
  );
  opacity: 0;
  transition: opacity 0.3s ease;

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

const ViewButton = styled(Link)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(220, 38, 38, 0.9);
  color: white;
  padding: 0.2rem 0.8rem;
  border-radius: 12px;
  font-weight: 400;
  text-decoration: none;
  opacity: 0;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  backdrop-filter: blur(10px);

  ${CardContainer}:hover & {
    opacity: 1;
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CarTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const CarDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  line-height: 1.5;
`;

const CarSpecs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
`;

const SpecItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #666;

  svg {
    color: #dc2626;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: #dc2626;
  font-family: "Playfair Display", serif;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.8rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const CarCard: React.FC<CarCardProps> = ({ car, index = 0 }) => {
  return (
    <CardContainer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}>
      <ImageContainer>
        <CarImage src={car.images[0]} alt={car.brand} />
        <ImageOverlay />
        <ViewButton to={`/cars/${car._id}`}>
          <Eye size={18} />
          View
        </ViewButton>
      </ImageContainer>

      <CardContent>
        <CarTitle>
          {car.brand} {car.name}
        </CarTitle>
        {/* <CarDescription>{car.description}</CarDescription> */}

        <CarSpecs>
          <SpecItem>
            <Calendar size={16} />
            <span>{car.year}</span>
          </SpecItem>
          <SpecItem>
            <Settings size={16} />
            <span>{car.transmission}</span>
          </SpecItem>
          <SpecItem>
            <Fuel size={16} />
            <span>{car.fuelType}</span>
          </SpecItem>
          <SpecItem>
            <span>{formatMileage(car.mileage)} miles</span>
          </SpecItem>
        </CarSpecs>

        <PriceContainer>
          <Price>₦{car.price.toLocaleString()}</Price>
        </PriceContainer>

        <ActionButtons>
          <Link to={`/checkout/${car._id}`}>
            <Button variant="primary" size="small" fullWidth>
              Buy Now
            </Button>
          </Link>
          <Link to={`/book-inspection?car=${car._id}`}>
            <Button variant="outline" size="small" fullWidth>
              Book Inspection
            </Button>
          </Link>
        </ActionButtons>
      </CardContent>
    </CardContainer>
  );
};

export default CarCard;
