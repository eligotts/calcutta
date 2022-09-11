//import './App.css';
import Home from './pages/Home'
import Add from './pages/Add'
import { BrowserRouter as Router, Routes, Route } from  'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="add/" element={<Add/>}/>
          {/* <Route path="/players/:id" element={<Home/>}/> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
