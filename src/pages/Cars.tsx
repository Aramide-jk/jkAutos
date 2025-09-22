import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import CarCard from "../components/CarCard";
import Button from "../components/Button";
import api from "../services/api";

const CarsContainer = styled.div`
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
  font-weight: 500;
  color: #2b2b2b;
  margin-bottom: 1rem;
`;

const PageSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
`;

const FiltersSection = styled.section`
  padding: 2rem;
  max-width: 1280px;
  margin: 0 auto;
  border-bottom: 1px solid rgba(220, 38, 38, 0.2);
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 3rem;
  border: 2px solid rgba(220, 38, 38, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #dc2626;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
`;

const FilterSelect = styled.select`
  padding: 0.8rem 1rem;
  border: 2px solid rgba(220, 38, 38, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  background: white;
  color: #2b2b2b;
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }
`;

const ClearFiltersButton = styled.button`
  background: transparent;
  color: #dc2626;
  padding: 0.8rem 1rem;
  border: 2px solid #dc2626;
  border-radius: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #dc2626;
    color: white;
  }
`;

const ResultsSection = styled.section`
  padding: 2rem;
  max-width: 1280px;
  margin: 0 auto;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`;

const ResultsCount = styled.p`
  color: #666;
  font-size: 1.1rem;
`;

const SortContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SortLabel = styled.span`
  color: #2b2b2b;
  font-weight: 500;
`;

const CarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;

  h3 {
    font-family: "Playfair Display", serif;
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #2b2b2b;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
`;

const Cars: React.FC = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [transmissionFilter, setTransmissionFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await api.get("/cars");
        if (Array.isArray(response.data)) {
          setCars(response.data);
        } else {
          setCars([]);
        }
        setError(null);
      } catch (err) {
        setError("Failed to fetch cars.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  // Get unique values for filters
  const brands = [...new Set(cars.map((car) => car.brand))].sort();
  const years = [...new Set(cars.map((car) => car.year))].sort((a, b) => b - a);
  const transmissions = [
    ...new Set(cars.map((car) => car.transmission)),
  ].sort();

  const filteredAndSortedCars = useMemo(() => {
    let filtered = cars.filter((car) => {
      const matchesSearch =
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.carModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBrand = !brandFilter || car.brand === brandFilter;
      const matchesYear = !yearFilter || car.year.toString() === yearFilter;
      const matchesTransmission =
        !transmissionFilter || car.transmission === transmissionFilter;

      let matchesPrice = true;
      if (priceFilter) {
        switch (priceFilter) {
          case "under-50k":
            matchesPrice = car.price < 50000;
            break;
          case "50k-100k":
            matchesPrice = car.price >= 50000 && car.price < 100000;
            break;
          case "100k-150k":
            matchesPrice = car.price >= 100000 && car.price < 150000;
            break;
          case "over-150k":
            matchesPrice = car.price >= 150000;
            break;
        }
      }

      return (
        matchesSearch &&
        matchesBrand &&
        matchesYear &&
        matchesTransmission &&
        matchesPrice
      );
    });

    // Sort cars
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "year-new":
          return b.year - a.year;
        case "year-old":
          return a.year - b.year;
        case "brand":
          return a.carModel.localeCompare(b.carModel);
        default:
          return a.brand.localeCompare(b.brand);
      }
    });

    return filtered;
  }, [
    searchTerm,
    brandFilter,
    yearFilter,
    priceFilter,
    transmissionFilter,
    sortBy,
    cars,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setBrandFilter("");
    setYearFilter("");
    setPriceFilter("");
    setTransmissionFilter("");
  };

  if (loading) {
    return (
      <CarsContainer>
        <ResultsSection>
          <ResultsCount>Loading cars...</ResultsCount>
        </ResultsSection>
      </CarsContainer>
    );
  }

  return (
    <CarsContainer>
      <HeaderSection>
        <PageTitle
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          Our Luxury Collection
        </PageTitle>
        <PageSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}>
          Discover exceptional vehicles curated for the most discerning
          automotive enthusiasts
        </PageSubtitle>
      </HeaderSection>
      <FiltersSection>
        <FiltersContainer>
          <SearchContainer>
            <SearchIcon size={20} />
            <SearchInput
              type="text"
              placeholder="Search by brand, model, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>

          <FilterGroup>
            <FilterSelect
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}>
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </FilterSelect>

            <FilterSelect
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}>
              <option value="">All Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </FilterSelect>

            <FilterSelect
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}>
              <option value="">All Prices</option>
              <option value="under-50k">Under ₦50k</option>
              <option value="50k-100k">₦50k - ₦100k</option>
              <option value="100k-150k">₦100k - ₦150k</option>
              <option value="over-150k">Over ₦150k</option>
            </FilterSelect>

            <FilterSelect
              value={transmissionFilter}
              onChange={(e) => setTransmissionFilter(e.target.value)}>
              <option value="">All Transmissions</option>
              {transmissions.map((transmission) => (
                <option key={transmission} value={transmission}>
                  {transmission}
                </option>
              ))}
            </FilterSelect>

            <ClearFiltersButton onClick={clearFilters}>
              Clear Filters
            </ClearFiltersButton>
          </FilterGroup>
        </FiltersContainer>
      </FiltersSection>

      <ResultsSection>
        <ResultsHeader>
          {error ? (
            <ResultsCount style={{ color: "red" }}>{error}</ResultsCount>
          ) : (
            <ResultsCount>
              {filteredAndSortedCars.length}{" "}
              {filteredAndSortedCars.length === 1 ? "car" : "cars"} found
            </ResultsCount>
          )}

          <SortContainer>
            <SortLabel>Sort by:</SortLabel>
            <FilterSelect
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}>
              <option value="brand">Brand (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="year-new">Year (Newest First)</option>
              <option value="year-old">Year (Oldest First)</option>
              <option value="brand">Brand</option>
            </FilterSelect>
          </SortContainer>
        </ResultsHeader>

        {filteredAndSortedCars.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>
            <CarsGrid>
              {filteredAndSortedCars.map((car, index) => {
                return <CarCard key={car._id} car={car} index={index} />;
              })}
            </CarsGrid>
          </motion.div>
        ) : (
          <NoResults>
            <h3>No cars found</h3>
            <p>Try adjusting your search criteria or clearing the filters</p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </NoResults>
        )}
      </ResultsSection>
    </CarsContainer>
  );
};

export default Cars;
