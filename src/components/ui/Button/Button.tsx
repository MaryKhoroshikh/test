import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    title?: string;
    text?: string; // текст кнопки (альтернатива children)
    children?: ReactNode; // содержимое кнопки (может быть текстом или элементами)
    onClick?: () => void;
    'aria-label'?: string; // метка для доступности
    'aria-describedby'?: string; // ID элемента с описанием
    'aria-disabled'?: boolean; // явное указание недоступности
    type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button = ({
    className = '',
    title,
    text,
    children,
    onClick,
    'aria-label': ariaLabel,
    'aria-disabled': ariaDisabled,
    type = 'button',
    ...rest
}: ButtonProps) => {
    // Если переданы и text, и children — приоритет у children
    const buttonContent = children ?? text ?? '';

    return (
        <button
            type={type}
            className={`${styles.btn} ${className}`}
            title={title}
            onClick={onClick}
            aria-label={ariaLabel}
            aria-disabled={ariaDisabled}
            {...rest}
        >
            {buttonContent}
        </button>
    );
};

export default Button;
