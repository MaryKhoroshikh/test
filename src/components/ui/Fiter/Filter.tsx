import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtersSelectors, TTag } from '../../../slices/filtersSlice';
import {
    toggleFilter,
    addTags,
    deleteTags,
    cleanFilters
} from '../../../slices/filtersSlice';
import styles from './Filter.module.css';
import Button from '../Button/Button';

const Filter = () => {
    const dispatch = useDispatch();
    const [activeFilter, setActiveFilter] = useState(
        useSelector(filtersSelectors.activeFilter)
    );
    const selectedTags = useSelector(filtersSelectors.tags);

    const [isTagsOpen, setIsTagsOpen] = useState(false);
    const tags: TTag[] = ['хвойное', 'лиственное'];

    const handleFilterClick = (filter: 'все' | 'избранные') => {
        dispatch(toggleFilter(filter));
        setActiveFilter(filter);
    };

    const handleTagClick = (tag: TTag) => {
        dispatch(addTags(tag));
    };

    const removeTag = (tag: TTag) => {
        dispatch(deleteTags(tag));
    };

    return (
        <div className={styles.container}>
            {/* Кнопки "Все" и "Избранные" */}
            <Button
                text='Все'
                className={`${styles.btn} ${activeFilter === 'все' ? styles.active : ''}`}
                onClick={() => handleFilterClick('все')}
                aria-label='выбрать все'
            />
            <Button
                text='Избранные'
                className={`${styles.btn} ${activeFilter === 'избранные' ? styles.active : ''}`}
                onClick={() => handleFilterClick('избранные')}
                aria-label='выбрать только избранные'
            />

            {/* Кнопка "Теги" с выпадающим списком */}
            <div className={styles.dropdown}>
                <Button
                    text='Теги'
                    className={styles.btn}
                    aria-label='развернуть теги'
                    onMouseEnter={() => setIsTagsOpen(true)}
                    onFocus={() => setIsTagsOpen(true)}
                    onBlur={() => setIsTagsOpen(false)}
                />

                {isTagsOpen && (
                    <div
                        className={styles.dropdownMenu}
                        onMouseEnter={() => setIsTagsOpen(true)}
                        onMouseLeave={() => setIsTagsOpen(false)}
                    >
                        {tags.map((tag) => (
                            <div
                                key={tag}
                                className={styles.dropdownItem}
                                onClick={() => handleTagClick(tag)}
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Отображение выбранных тегов справа от кнопки "Теги" */}
            <div className={styles.selectedTags}>
                {selectedTags.map((tag) => (
                    <span key={tag} className={styles.tagChip}>
                        {tag}
                        <Button
                            text='×'
                            className={styles.removeTag}
                            onClick={() => removeTag(tag)}
                            aria-label='удалить тег'
                        />
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Filter;
