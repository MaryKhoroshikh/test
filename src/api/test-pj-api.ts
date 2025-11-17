import { TCard } from '../components/ui/Card/Card';

// импортируем URL, где лежат моковые данные
const URL = process.env.REACT_APP_API_URL;

//базовый обработчик ответа от сервера
const checkResponse = <T>(res: Response): Promise<T> =>
    res.ok
        ? res.json()
        : Promise.reject(new Error(`HTTP error! status: ${res.status}`));

//типы для ответа от сервера
export type TServerResponse<T> = T;

type TCardResponse = TServerResponse<TCard[]>;

// методы API
//получение списка карточек
export const getCardsApi = (): Promise<TCard[]> =>
    fetch(`${URL}`)
        .then((res) => checkResponse<TCardResponse>(res))
        .catch((error) => {
            console.error('Fetch error:', error);
            throw error;
        });

//получение карточки по ID
export const getCardByIdApi = (id: string): Promise<TCard> =>
    fetch(`${URL}/${id}`)
        .then((res) => checkResponse<TServerResponse<TCard>>(res))
        .catch((error) => {
            console.error('Fetch error:', error);
            throw error;
        });
