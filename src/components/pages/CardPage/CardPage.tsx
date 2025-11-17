import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './CardPage.module.css';
import { TCard } from '../../ui/Card/Card';
import { useDispatch, useSelector } from '../../../slices/store';
import { cardsSelectors, getCardsByIdThunk } from '../../../slices/cardsSlice';
import { IconTree } from '../../ui/Icon/Icon';
import Button from '../../ui/Button/Button';

const CardPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const card = useSelector(cardsSelectors.previewCard);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!card && id) {
            dispatch(getCardsByIdThunk(id));
        }
    }, [id]);

    return (
        <div className={styles.container}>
            {card && <h1 className={styles.title}>{card.title}</h1>}
            {card && (
                <div className={styles.content}>
                    <div className={styles.imgColumn}>
                        <img
                            src={card.imageUrl}
                            alt={card.title}
                            className={styles.cardImage}
                        />
                        <p>{card.description}</p>
                    </div>
                    <div className={styles.infoColumn}>
                        <ul className={styles.tagsList}>
                            {card.tags.map((tag, index) => (
                                <li key={index}>{tag}</li>
                            ))}
                        </ul>
                        <h3>Интересный факт</h3>
                        {card.additionalInfo && <p>{card.additionalInfo}</p>}
                        <IconTree />
                    </div>
                </div>
            )}
            {card && (
                <Button
                    className={styles.backButton}
                    onClick={() => navigate('/products')}
                    aria-label='вернуться на страницу продуктов'
                >
                    Вернуться
                </Button>
            )}
        </div>
    );
};

export default CardPage;
