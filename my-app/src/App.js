import './App.css';
import Login from './Login';
import HomePage from './HomePage';
import DetailsPage from './DetailsPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/HomePage' element={<HomePage/>}/>
        <Route path='/DetailsPage' element={<DetailsPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
