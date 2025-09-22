import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Award, Zap, Users } from "lucide-react";
import Button from "../components/Button";
import CarCard from "../components/CarCard";
import api from "../services/api";

const HomeContainer = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  // background: linear-gradient(135deg, #f8f7f4 0%, rgba(220, 38, 38, 0.1) 100%);
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("https://images.pexels.com/photos/919073/pexels-photo-919073.jpeg?auto=compress&cs=tinysrgb&w=800")
    center/cover;
  // opacity: 0.15;
  z-index: 1;
`;

const HeroContent = styled.div`
  text-align: center;
  z-index: 2;
  max-width: 800px;
  padding: 0 2rem;
`;

const HeroTitle = styled(motion.h1)`
  font-family: "Playfair Display", serif;
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: normal;
  color: white;
  margin-bottom: 1.5rem;
  line-height: 1.1;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  color: white;
  margin-bottom: 1rem;
  line-height: 1.6;
`;

const HeroTagline = styled(motion.p)`
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: #dc2626;
  font-style: italic;
  margin-bottom: 3rem;
  font-weight: 500;
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Section = styled.section`
  padding: 6rem 8rem;
  max-width: 1280px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: "Playfair Display", serif;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 500;
  color: #2b2b2b;
  text-align: center;
  margin-bottom: 3rem;
`;

const FeaturedCarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ViewAllButton = styled.div`
  text-align: center;
`;

const WhyChooseSection = styled.section`
  padding: 6rem 8rem;
  background: rgba(220, 38, 38, 0.05);
`;

const WhyChooseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(220, 38, 38, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: #dc2626;
`;

const FeatureTitle = styled.h3`
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const Home: React.FC = () => {
  const [featuredCars, setFeaturedCars] = useState<any[]>([]);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const response = await api.get("/cars");
        // Assuming the API returns all cars, we slice the first 3 for the feature section
        if (Array.isArray(response.data)) {
          setFeaturedCars(response.data.slice(0, 3));
          console.log(response.data);
        } else {
          console.error(
            "API did not return an array for featured cars:",
            response.data
          );
        }
      } catch (error) {
        console.error("Failed to fetch featured cars:", error);
      }
    };

    fetchFeaturedCars();
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Trusted Dealer",
      description:
        "Over a decade of excellence in luxury car sales with verified authenticity and complete transparency.",
    },
    {
      icon: Award,
      title: "Luxury Curation",
      description:
        "Each vehicle is hand-picked for its exceptional quality, performance, and pristine condition.",
    },
    {
      icon: Zap,
      title: "Seamless Buying",
      description:
        "Streamlined purchase process with flexible financing options and comprehensive support.",
    },
    {
      icon: Users,
      title: "Expert Support",
      description:
        "Dedicated luxury car specialists to guide you through every step of your purchase journey.",
    },
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroBackground />
        <HeroContent>
          <HeroTitle
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            Luxury on Wheels
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            Curated cars, seamless buying, trusted by many.
          </HeroSubtitle>
          <HeroTagline
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}>
            "Where Excellence Meets Elegance"
          </HeroTagline>
          <HeroButtons
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}>
            <Link to="/cars">
              <Button variant="primary" size="large">
                View Cars <ArrowRight size={20} />
              </Button>
            </Link>
            <Link to="/book-inspection">
              <Button variant="outline" size="large">
                Book Inspection
              </Button>
            </Link>
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>
          <SectionTitle>Featured Collection</SectionTitle>
          <FeaturedCarsGrid>
            {featuredCars.map((car, index) => (
              <CarCard key={car._id} car={car} index={index} />
            ))}
          </FeaturedCarsGrid>
          <ViewAllButton>
            <Link to="/cars">
              <Button variant="secondary" size="large">
                View All Cars <ArrowRight size={20} />
              </Button>
            </Link>
          </ViewAllButton>
        </motion.div>
      </Section>

      <WhyChooseSection>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}>
          <SectionTitle>Why Choose jk_Autos</SectionTitle>
          <WhyChooseGrid>
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}>
                <FeatureIcon>
                  <feature.icon size={32} />
                </FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </WhyChooseGrid>
        </motion.div>
      </WhyChooseSection>
    </HomeContainer>
  );
};

export default Home;
