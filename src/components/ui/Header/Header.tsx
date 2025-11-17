import React from 'react';
import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button/Button';

const Header = () => {
    const location = useLocation();
    return (
        <header className={styles.header}>
            <nav className={styles.navMenu}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link to={'/products'}>
                            <Button
                                className={`${styles.navButton} ${location.pathname === '/products' ? styles.active : ''}`}
                                aria-label='перейти на страницу продуктов'
                            >
                                Продукты
                            </Button>
                        </Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to={'/create-new-card'}>
                            <Button
                                className={`${styles.navButton} ${location.pathname === '/create-new-card' ? styles.active : ''}`}
                                aria-label='перейти на страницу создания нового продукта'
                            >
                                Создать новый продукт
                            </Button>
                        </Link>
                    </li>
                </ul>
            </nav>

            <Link to={'/'} className={styles.logoLink}>
                <div className='logo-container'>
                    <img
                        src='https://salfa.ru/wp-content/uploads/2025/04/Asset-11-1_edited-1.jpg'
                        alt='Логотип компании по разработке сайтов и приложений'
                        width='50'
                    ></img>
                </div>
            </Link>
        </header>
    );
};

export default Header;
