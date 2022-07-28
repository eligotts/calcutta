//import './App.css';
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from  'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          {/* <Route path="/players/:id" element={<Home/>}/> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
