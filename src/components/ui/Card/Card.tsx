import React, { MouseEventHandler, useState } from 'react';
import styles from './Card.module.css';
import { IconLike, IconLikeChecked, IconTrash } from '../Icon/Icon';
import { useDispatch, useSelector } from '../../../slices/store';
import {
    cardsSelectors,
    dislikeCard,
    likeCard
} from '../../../slices/cardsSlice';

export type TCard = {
    id: number; // Уникальный идентификатор карточки
    title: string; // Заголовок карточки
    description: string; // Описание карточки
    imageUrl: string; // URL изображения карточки
    tags: string[]; // Массив тегов карточки
    additionalInfo?: string;
};

export interface CardProps {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    tags: string[];
    additionalInfo?: string;
    onDelete: () => void;
    onClick: () => void;
}

const Card = (props: CardProps) => {
    const dispatch = useDispatch();

    const likedCards = useSelector(cardsSelectors.likedCards);
    const isCardLiked = likedCards?.some((it) => it.id === props.id) || false;

    const handleLike = () => {
        if (isCardLiked) {
            dispatch(dislikeCard(props.id));
        } else {
            dispatch(likeCard(props.id));
        }
    };

    const handleCardClick: MouseEventHandler<HTMLDivElement> = (event) => {
        const target = event.target as HTMLElement;

        if (
            target.closest(`.${styles.likeButton}`) || // корзина
            target.closest(`.${styles.deleteButton}`) // лайк
        ) {
            return;
        }

        props.onClick();
    };

    return (
        <div className={styles.card} onClick={handleCardClick}>
            <img
                src={props.imageUrl}
                alt='изображение товара'
                className={styles.image}
            />
            <div className={styles.content}>
                <h2 className={styles.title}>{props.title}</h2>
                <p className={styles.description}>{props.description}</p>
            </div>
            <div className={styles.actions}>
                <div className={styles.deleteButton} onClick={props.onDelete}>
                    <IconTrash />
                </div>
                <div className={styles.likeButton} onClick={handleLike}>
                    {isCardLiked ? <IconLikeChecked /> : <IconLike />}
                </div>
            </div>
        </div>
    );
};

export default Card;
