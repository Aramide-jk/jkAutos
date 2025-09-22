import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";

// Import pages
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetail from "./pages/CarDetail";
import BookInspection from "./pages/BookInspection";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";

// Import components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import GlobalStyles from "./styles/GlobalStyles";
// import { AuthProvider } from "./contexts/AuthContext";
import { AuthProvider } from "./contexts/AuthContext";
import Payment from "./pages/Payment";

const AppContainer = styled.div`
  min-height: 100vh;
  // background-color: #f8f7f4;
`;

const MainContent = styled.main`
  min-height: calc(100vh - 120px);
`;

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContainer>
          <GlobalStyles />
          <Navbar />
          <MainContent>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cars" element={<Cars />} />
                <Route path="/cars/:id" element={<CarDetail />} />
                <Route path="/book-inspection" element={<BookInspection />} />
                <Route path="/checkout/:id" element={<Checkout />} />
                <Route path="/payment/:id" element={<Payment />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/signin" element={<SignIn />} />
              </Routes>
            </AnimatePresence>
          </MainContent>
          <Footer />
        </AppContainer>
      </AuthProvider>
    </Router>
  );
}

export default App;
