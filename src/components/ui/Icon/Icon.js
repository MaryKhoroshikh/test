import { AiFillHeart, AiFillDelete } from 'react-icons/ai';
import { GiBirchTrees } from 'react-icons/gi';

export const IconLike = () => {
    return (
        <AiFillHeart
            size={24}
            style={{
                stroke: 'black'
            }}
        />
    );
};

export const IconLikeChecked = () => {
    return (
        <AiFillHeart
            size={24}
            style={{
                fill: 'red'
            }}
        />
    );
};

export const IconTrash = () => {
    return <AiFillDelete size={24} />;
};

export const IconTree = () => {
    return <GiBirchTrees size={48} />;
};
