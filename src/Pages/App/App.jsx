import { useState } from 'react';
import './App.css'
import NewOrderPage from '../NewOrderPage/NewOrderPage';
import AuthPage from '../AuthPage/AuthPage';
import { Routes, Route } from 'react-router-dom';
import OrderHistoryPage from '../OrderHistoryPage/OrderHistoryPage';
import Navbar from '../../Components/Navbar';
import { getUser } from '../../utilities/users-service';

export default function App() {

  const [user,setUser] = useState(getUser())


  return (
    <main className="App">
      {user ? 
      <>
        <Navbar user={user} setUser={setUser}/>
        <Routes>
          <Route path='/orders' element={<OrderHistoryPage />} />
          <Route path='/orders/new' element={<NewOrderPage />} />
        </Routes>
      </>
      :
      <AuthPage setUser={setUser}/>
      }
    </main>
  );
}
