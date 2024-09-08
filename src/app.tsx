import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

// Paginas
import Home from '@/pages/Home';
import NewPrediction from '@/pages/NewPrediction';
import Table from '@/pages/Table';
import Profile from '@/pages/Profile';
// Componentes
import Header from '@/components/Header';
import Aside from '@/components/Aside';
import Footer from '@/components/Footer';
// Tipos
import type { Context } from '@/types';

export default function App() {
    const context: Context = {
        matchday: {
            current: 13,
            max: 27,
        }
    };

    const [isAsideOpen, setIsAsideOpen] = useState(true);

    const toggleAside = () => {
        setIsAsideOpen(prev => !prev);
    }

    return (
        <BrowserRouter>
            <Header context={context} toggleAside={toggleAside} />
            <Aside context={context} isOpen={isAsideOpen} />
            <main className='lg:ml-[256px] px-6 py-[96px]'>
                <Routes>
                    <Route path="/" element={<Home context={context} />} />
                    <Route path="/fecha/:fecha" element={<Home context={context} />} />
                    <Route path="/participar/fecha/:fecha" element={<NewPrediction context={context} />} />
                    <Route path="/tabla" element={<Table />} />
                    <Route path="/usuario/:user" element={<Profile />} />
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
    );
}
