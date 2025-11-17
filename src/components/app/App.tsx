import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import Header from '../ui/Header/Header';
import CardList from '../pages/CardList/CardList';
import CreateCard from '../pages/CreateCard/CreateCard';
import { Footer } from '../ui/Footer';
import CardPage from '../pages/CardPage/CardPage';

function App() {
    return (
        <div className={styles.App}>
            <Header />
            <Routes>
                <Route
                    path='/test/'
                    element={<Navigate to='/products' replace />}
                />
                <Route path='/products' element={<CardList />} />
                <Route path='/create-new-card' element={<CreateCard />} />
                <Route path='/products/:id' element={<CardPage />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
