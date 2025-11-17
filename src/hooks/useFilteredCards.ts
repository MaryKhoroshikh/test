import { useSelector } from 'react-redux';
import { TCard } from '../components/ui/Card/Card';
import { filtersSelectors } from '../slices/filtersSlice';
import { cardsSelectors } from '../slices/cardsSlice';

export const useFilteredCards = (cards: TCard[] | null) => {
    // Получаем состояние фильтров из стора
    const activeFilter = useSelector(filtersSelectors.activeFilter);
    const selectedTags = useSelector(filtersSelectors.tags);

    const likedCards = useSelector(cardsSelectors.likedCards);

    // Фильтруем карточки
    const filteredCards = cards
        ? cards.filter((card: TCard) => {
              // 1. Фильтрация по активному фильтру
              if (activeFilter === 'избранные') {
                  // Проверяем, есть ли карточка в списке likedCards
                  const isLiked = likedCards?.some(
                      (likedCard) => likedCard.id === card.id
                  );
                  if (!isLiked) {
                      return false;
                  }
              }

              // 2. Фильтрация по тегам
              if (selectedTags.length > 0) {
                  const hasSelectedTag = selectedTags.some((selectedTag) =>
                      card.tags?.includes(selectedTag)
                  );
                  if (!hasSelectedTag) {
                      return false;
                  }
              }

              return true; // проходит все фильтры
          })
        : [];

    return filteredCards;
};
