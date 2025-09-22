import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Award, Users, Shield, Zap, CheckCircle, Star } from 'lucide-react';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding-top: 100px;
`;

const HeroSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  background: linear-gradient(135deg, #F8F7F4 0%, rgba(220, 38, 38, 0.1) 100%);
`;

const HeroTitle = styled(motion.h1)`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 600;
  color: #1A1A1A;
  margin-bottom: 1.5rem;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const HeroTagline = styled(motion.p)`
  font-size: 1.1rem;
  color: #DC2626;
  font-style: italic;
  font-weight: 500;
`;

const Section = styled.section`
  padding: 5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  color: #1A1A1A;
  text-align: center;
  margin-bottom: 3rem;
`;

const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const StoryImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`;

const StoryContent = styled.div`
  h3 {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    color: #1A1A1A;
    margin-bottom: 1.5rem;
  }

  p {
    color: #666;
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const ValueCard = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ValueIcon = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(220, 38, 38, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: #DC2626;
`;

const ValueTitle = styled.h4`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  color: #1A1A1A;
  margin-bottom: 1rem;
`;

const ValueDescription = styled.p`
  color: #666;
  line-height: 1.6;
`;

const StatsSection = styled.section`
  background: rgba(220, 38, 38, 0.05);
  padding: 4rem 2rem;
  margin: 4rem 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const StatItem = styled(motion.div)`
  text-align: center;
`;

const StatNumber = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  font-weight: 700;
  color: #DC2626;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #2B2B2B;
  font-size: 1.1rem;
  font-weight: 500;
`;

const TestimonialsSection = styled.section`
  padding: 5rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const TestimonialCard = styled(motion.div)`
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  position: relative;

  &::before {
    content: '"';
    position: absolute;
    top: -10px;
    left: 20px;
    font-size: 4rem;
    color: #DC2626;
    font-family: 'Playfair Display', serif;
  }
`;

const TestimonialText = styled.p`
  color: #666;
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  padding-top: 1rem;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #1A1A1A;
  font-weight: 600;

  .stars {
    color: #FFD700;
    margin-left: auto;
  }
`;

const About: React.FC = () => {
  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: 'We maintain the highest standards in every vehicle we curate, ensuring only the finest luxury cars make it to our collection.'
    },
    {
      icon: Shield,
      title: 'Trust',
      description: 'Built on transparency and integrity, we provide complete vehicle histories and honest assessments to earn your confidence.'
    },
    {
      icon: Users,
      title: 'Service',
      description: 'Our dedicated team of luxury car specialists provides personalized service tailored to your unique preferences and needs.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Embracing cutting-edge technology and modern practices to create a seamless, sophisticated buying experience.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Cars Sold' },
    { number: '15+', label: 'Years Experience' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '50+', label: 'Luxury Brands' }
  ];

  const testimonials = [
    {
      text: "jk_Autos transformed my car buying experience. Their attention to detail and commitment to excellence is unmatched. I found my dream car and couldn't be happier.",
      author: "Sarah Johnson"
    },
    {
      text: "The level of service and professionalism at jk_Autos is exceptional. They made purchasing my luxury vehicle effortless and enjoyable.",
      author: "Michael Chen"
    },
    {
      text: "From browsing to purchase, every step was seamless. The team's expertise in luxury vehicles is evident in their curated collection.",
      author: "Emma Rodriguez"
    }
  ];

  return (
    <AboutContainer>
      <HeroSection>
        <HeroTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Curating Automotive Excellence
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          For over a decade, we've been connecting discerning buyers with the world's
          finest luxury vehicles, creating lasting relationships built on trust and excellence.
        </HeroSubtitle>
        <HeroTagline
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          "Where Passion Meets Precision"
        </HeroTagline>
      </HeroSection>

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Our Story</SectionTitle>
          <StoryGrid>
            <StoryImage 
              src="https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Luxury car showroom"
            />
            <StoryContent>
              <h3>A Legacy of Luxury</h3>
              <p>
                Founded in 2010 with a vision to redefine the luxury car buying experience,
                jk_Autos began as a boutique dealership focused on curating exceptional vehicles
                for exceptional people.
              </p>
              <p>
                Our founder's passion for automotive excellence and commitment to customer
                satisfaction laid the foundation for what has become a trusted name in
                luxury vehicle sales.
              </p>
              <p>
                Today, we continue to uphold those founding principles while embracing
                innovation and expanding our reach to serve luxury car enthusiasts worldwide.
              </p>
            </StoryContent>
          </StoryGrid>
        </motion.div>
      </Section>

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Our Values</SectionTitle>
          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ValueIcon>
                  <value.icon size={32} />
                </ValueIcon>
                <ValueTitle>{value.title}</ValueTitle>
                <ValueDescription>{value.description}</ValueDescription>
              </ValueCard>
            ))}
          </ValuesGrid>
        </motion.div>
      </Section>

      <StatsSection>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Our Track Record</SectionTitle>
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatItem
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            ))}
          </StatsGrid>
        </motion.div>
      </StatsSection>

      <TestimonialsSection>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionTitle>What Our Clients Say</SectionTitle>
          <TestimonialGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <TestimonialText>{testimonial.text}</TestimonialText>
                <TestimonialAuthor>
                  {testimonial.author}
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialGrid>
        </motion.div>
      </TestimonialsSection>
    </AboutContainer>
  );
};

export default About;