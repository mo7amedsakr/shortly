import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Header from './containers/Header/Header';
import ShortenItSection from './containers/ShortenItSection/ShortenItSection';
import AdvancedStatisicsSection from './containers/AdvancedStatisicsSection/AdvancedStatisicsSection';
import GetStartedSection from './containers/GetStartedSection/GetStartedSection';
import Footer from './containers/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Header />
      <ShortenItSection />
      <AdvancedStatisicsSection />
      <GetStartedSection />
      <Footer />
    </div>
  );
}

export default App;
