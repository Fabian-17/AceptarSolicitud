import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { User } from '../components/user';
import { Chofer } from '../components/chofer';
import Aceptar from '../components/aceptar';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<User />} />
                <Route path="/chofer" element={<Chofer />} />
                <Route path="/aceptar" element={<Aceptar />} />
            </Routes>
        </BrowserRouter>
    )
};