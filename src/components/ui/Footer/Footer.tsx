import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.contactInfo}>
                <p>Тестовое задание выполнила:</p>
                <p>Хороших Мария</p>
            </div>
            <div className={styles.contactInfo}>
                <p>
                    email: <a className={styles.link} href="mailto:goodmary1024@gmail.com">goodmary1024@gmail.com</a>
                </p>
                <p>
                    tg: <a className={styles.link} href="https://t.me/goodmary1024">goodmary1024</a>
                </p>
            </div>
        </footer>
    );
};
