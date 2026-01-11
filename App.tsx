
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Forum from './pages/Forum';
import Dashboard from './pages/Dashboard';
import SellForm from './pages/SellForm';
import { ProductType } from './types';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route 
                  path="/new" 
                  element={
                    <ProductList 
                      type={ProductType.NEW} 
                      title="Official New Models" 
                      subtitle="Latest technology from Lenovo-authorized partners." 
                    />
                  } 
                />
                <Route 
                  path="/used" 
                  element={
                    <ProductList 
                      type={ProductType.USED} 
                      title="Community Marketplace" 
                      subtitle="Find rare gems or sell your own beloved ThinkPad." 
                    />
                  } 
                />
                <Route 
                  path="/parts" 
                  element={
                    <ProductList 
                      type={ProductType.PART} 
                      title="Spare Parts & Mod Kits" 
                      subtitle="Everything you need for maintenance, repairs, and FrankenPads." 
                    />
                  } 
                />
                <Route path="/forum" element={<Forum />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/sell" element={<SellForm />} />
              </Routes>
            </main>

            <Footer />
            <ChatAssistant />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
