import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from '../../../slices/store';
import { TCard } from '../Card/Card';
import { cardsSelectors, createCard, getCardsThunk } from '../../../slices/cardsSlice';
import { useSelector } from 'react-redux';
import styles from './CreateCardForm.module.css';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/Button';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Заголовок обязателен'),
    description: Yup.string().required('Описание обязательно'),
    imageUrl: Yup.string()
        .url('Введите корректный URL изображения')
        .required('URL изображения обязателен'),
    tags: Yup.array()
        .of(Yup.string().required())
        .min(1, 'Добавьте хотя бы один тег')
        .required('Теги обязательны'),
    additionalInfo: Yup.string()
});

const CreateCardForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cards = useSelector(cardsSelectors.cards);
    const [isIDErr, setIDErr] = useState(false);

    useEffect(() => {
            if (!cards) dispatch(getCardsThunk());
    }, [dispatch]);
    
    const handleSubmit = (values: TCard) => {
        const newCardID = cards ? cards.length + 1 : null;
        console.log(newCardID, 'handleSubmit');
        if (newCardID) {
            setIDErr(false);
            const card: TCard = { ...values, id: newCardID };
            dispatch(createCard(card));
            navigate('/products');
        } else {
            setIDErr(true);
        }
    };

    return (
        <Formik
            initialValues={{
                title: '',
                description: '',
                imageUrl: '',
                tags: [],
                additionalInfo: '',
                id: 0
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ errors, touched, setFieldValue }) => (
                <Form className={styles.formContainer}>
                    <div className={styles.formLabel}>
                        <label className={styles.label}>Заголовок:</label>
                        <Field
                            className={styles.formField}
                            name='title'
                            type='text'
                        />
                        <ErrorMessage
                            name='title'
                            component='div'
                            className={styles.errorText}
                        />
                    </div>
                    <div className={styles.formLabel}>
                        <label className={styles.label}>Описание:</label>
                        <Field
                            className={styles.formField}
                            name='description'
                            as='textarea'
                        />
                        <ErrorMessage
                            name='description'
                            component='div'
                            className={styles.errorText}
                        />
                    </div>
                    <div className={styles.formLabel}>
                        <label className={styles.label}>URL изображения:</label>
                        <Field
                            className={styles.formField}
                            name='imageUrl'
                            type='text'
                        />
                        <ErrorMessage
                            name='imageUrl'
                            component='div'
                            className={styles.errorText}
                        />
                    </div>
                    <div className={styles.formLabel}>
                        <label className={styles.label}>
                            Теги (через запятую):
                        </label>
                        <Field
                            className={styles.formField}
                            name='tags'
                            type='text'
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                                const tags = e.target.value
                                    .split(',')
                                    .map((tag) => tag.trim());
                                setFieldValue('tags', tags);
                            }}
                        />
                        <ErrorMessage
                            name='tags'
                            component='div'
                            className={styles.errorText}
                        />
                    </div>
                    <div className={styles.formLabel}>
                        <label className={styles.label}>
                            Дополнительная информация:
                        </label>
                        <Field
                            className={styles.formField}
                            name='additionalInfo'
                            as='textarea'
                        />
                    </div>
                    <Button
                        type='submit'
                        className={`${styles.submitButton} ${(!touched.title || errors.title ||
                            !touched.description || errors.description ||
                            !touched.imageUrl || errors.imageUrl ||
                            !touched.tags || errors.tags ||
                            !touched.additionalInfo || errors.additionalInfo) ? styles.disabled : ''}`}
                    >
                        Создать карточку
                    </Button>
                    {isIDErr && <p>Ошибка присвоения id, пожалуйста перезагрузите</p>}
                </Form>
            )}
        </Formik>
    );
};

export default CreateCardForm;
