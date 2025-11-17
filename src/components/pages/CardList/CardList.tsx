import React, { MouseEventHandler, useEffect } from 'react';
import styles from './CardList.module.css';
import Card, { TCard } from '../../ui/Card/Card';
import {
    cardsSelectors,
    getCardsThunk,
    setPreviewCard
} from '../../../slices/cardsSlice';
import { RootState, useDispatch, useSelector } from '../../../slices/store';
import Filter from '../../ui/Fiter/Filter';
import { deleteCard } from '../../../slices/cardsSlice';
import { filtersSelectors } from '../../../slices/filtersSlice';
import { useFilteredCards } from '../../../hooks/useFilteredCards';
import { useNavigate } from 'react-router-dom';

function CardList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = (id: number) => {
        dispatch(deleteCard(id));
    };

    const handleClick = (id: number) => {
        navigate(`/products/${id}`);
        dispatch(setPreviewCard(id));
    };

    const cards = useSelector(cardsSelectors.cards);
    console.log('Текущие карточки:', cards);
    const isLoading = useSelector(cardsSelectors.isLoading);
    const error = useSelector(cardsSelectors.error);

    useEffect(() => {
        if (!cards) dispatch(getCardsThunk());
    }, [dispatch]);

    const filteredCards = useFilteredCards(cards);

    return (
        <div className={styles.cardList}>
            <h2 className={styles.title}>Список продуктов</h2>
            <Filter />
            <div className={styles.content}>
                {isLoading && <div className={styles.loading}>Загрузка...</div>}
                {error && <div className={styles.error}>Ошибка: {error}</div>}
                {!isLoading && filteredCards.length === 0 && (
                    <div className={styles.noResults}>
                        Нет карточек, соответствующих фильтрам
                    </div>
                )}
                {filteredCards?.map((card: TCard) => (
                    <Card
                        key={card.id}
                        id={card.id}
                        title={card.title}
                        description={card.description}
                        imageUrl={card.imageUrl}
                        tags={card.tags}
                        onDelete={() => handleDelete(card.id)}
                        onClick={() => handleClick(card.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default CardList;
