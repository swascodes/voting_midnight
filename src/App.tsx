import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Vote from './pages/Vote';
import Results from './pages/Results';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Toaster position="bottom-right" toastOptions={{ style: { background: '#040b08', color: '#00ff9d', border: '1px solid #00ff9d' } }} />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/results" element={<Results />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
