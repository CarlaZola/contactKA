import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProtectedPages from '../pages/ProtectedPages';
import ContactPage from '../pages/ContactPage';
import { ContactProvider } from '../context/ContactContext';


export const RoutesMain = () => (
    
    <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='register' element={<RegisterPage />} />

        <Route path='/home' element={<ProtectedPages />}>
            <Route index element={
                <ContactProvider>
                    <ContactPage />
                </ContactProvider>          
            }/>
        </Route>
    </Routes>
)
   
