import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Fuel,
  Settings,
  Gauge,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import api from "../services/api";
import Button from "../components/Button";

const DetailContainer = styled.div`
  min-height: 100vh;
  padding-top: 100px;
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
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
`;

const CarDetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const MainImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageNavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(248, 247, 244, 0.9);
  color: #dc2626;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: #dc2626;
    color: white;
    transform: translateY(-50%) scale(1.1);
  }

  &.prev {
    left: 1rem;
  }

  &.next {
    right: 1rem;
  }
`;

const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

const Thumbnail = styled.img<{ $active: boolean }>`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 3px solid ${(props) => (props.$active ? "#DC2626" : "transparent")};

  &:hover {
    transform: scale(1.05);
    border-color: #dc2626;
  }
`;

const InfoSection = styled.div``;

const CarHeader = styled.div`
  margin-bottom: 2rem;
`;

const CarTitle = styled(motion.h1)`
  font-family: "Playfair Display", serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
`;

const CarPrice = styled(motion.div)`
  font-size: 2.5rem;
  font-weight: 700;
  color: #dc2626;
  font-family: "Playfair Display", serif;
  margin-bottom: 1rem;
`;

const CarDescription = styled(motion.p)`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SpecItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(220, 38, 38, 0.05);
  border-radius: 12px;

  svg {
    color: #dc2626;
    flex-shrink: 0;
  }
`;

const SpecContent = styled.div`
  h4 {
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 0.2rem;
    font-size: 0.9rem;
  }

  p {
    color: #666;
    font-size: 1rem;
  }
`;

const FeaturesSection = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #2b2b2b;

  &::before {
    content: "✓";
    color: #dc2626;
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: 4rem 2rem;

  h2 {
    font-family: "Playfair Display", serif;
    font-size: 2.5rem;
    color: #1a1a1a;
    margin-bottom: 1rem;
  }

  p {
    color: #666;
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

const CarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await api.get(`/cars/${id}`);
        setCar(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch car details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <DetailContainer>
        <NotFound>
          <h2>Loading...</h2>
        </NotFound>
      </DetailContainer>
    );
  }
  if (error || !car) {
    return (
      <DetailContainer>
        <NotFound>
          <h2>Car Not Found</h2>
          <p>The car you're looking for doesn't exist or has been removed.</p>
          <Link to="/cars">
            <Button variant="primary">View All Cars</Button>
          </Link>
        </NotFound>
      </DetailContainer>
    );
  }

  // Assuming gallery is an array of image URLs. If not, this needs adjustment.
  const galleryImages = car.images || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const specs = [
    { icon: Calendar, label: "Year", value: car.year },
    { icon: Fuel, label: "Fuel Type", value: car.fuelType },
    { icon: Settings, label: "Transmission", value: car.transmission },
    { icon: Gauge, label: "Mileage", value: car.mileage },
    { icon: Shield, label: "Condition", value: car.condition },
    { icon: Settings, label: "Engine", value: car.engine },
  ];

  return (
    <DetailContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <BackButton to="/cars">
          <ArrowLeft size={20} />
          Back to Cars
        </BackButton>

        <ContentWrapper>
          <CarDetailGrid>
            {galleryImages.length > 0 && (
              <ImageSection>
                <MainImageContainer>
                  <MainImage
                    src={galleryImages[currentImageIndex]}
                    alt={car.name}
                  />
                  <ImageNavButton className="prev" onClick={prevImage}>
                    <ChevronLeft size={24} />
                  </ImageNavButton>
                  <ImageNavButton className="next" onClick={nextImage}>
                    <ChevronRight size={24} />
                  </ImageNavButton>
                </MainImageContainer>

                <ThumbnailGrid>
                  {galleryImages.map((image: string, index: number) => (
                    <Thumbnail
                      key={index}
                      src={image}
                      alt={`${car.name} ${index + 1}`}
                      $active={index === currentImageIndex}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </ThumbnailGrid>
              </ImageSection>
            )}

            <InfoSection>
              <CarHeader>
                <CarTitle
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}>
                  {car.name}
                </CarTitle>

                <CarPrice
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}>
                  ₦{car.price.toLocaleString()}
                </CarPrice>

                <CarDescription
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}>
                  {car.description}
                </CarDescription>
              </CarHeader>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}>
                <SectionTitle>Specifications</SectionTitle>
                <SpecsGrid>
                  {specs.map((spec) => (
                    <SpecItem key={spec.label}>
                      <spec.icon size={24} />
                      <SpecContent>
                        <h4>{spec.label}</h4>
                        <p>{spec.value}</p>
                      </SpecContent>
                    </SpecItem>
                  ))}
                </SpecsGrid>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}>
                <FeaturesSection>
                  <SectionTitle>Premium Features</SectionTitle>
                  <FeaturesList>
                    {car.features &&
                      car.features.map((feature: string, index: number) => (
                        <FeatureItem key={index}>{feature}</FeatureItem>
                      ))}
                  </FeaturesList>
                </FeaturesSection>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}>
                <ActionButtons>
                  <Link to={`/checkout/${car.id}`} style={{ flex: 1 }}>
                    <Button variant="primary" size="large" fullWidth>
                      Buy Now
                    </Button>
                  </Link>
                  <Link
                    to={`/book-inspection?car=${car.id}`}
                    style={{ flex: 1 }}>
                    <Button variant="outline" size="large" fullWidth>
                      Book Inspection
                    </Button>
                  </Link>
                </ActionButtons>
              </motion.div>
            </InfoSection>
          </CarDetailGrid>
        </ContentWrapper>
      </motion.div>
    </DetailContainer>
  );
};

export default CarDetail;
