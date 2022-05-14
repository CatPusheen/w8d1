import React, { useEffect } from 'react';
import api from '../utils/api';
import { Card as CardMUI } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import IconButton from '@mui/material/IconButton';

export const Card = ({ itemData, isInFevorits, setFavorites }) => {
    const writeLS = (key, value) => {
        const storage = JSON.parse(localStorage.getItem(key)) || [];
        storage.push(value);
        localStorage.setItem(key, JSON.stringify(storage));
    };

    const removeLS = (key, value) => {
        const storage = JSON.parse(localStorage.getItem(key));
        const filteredStorage = storage.filter((itemID) => value !== itemID);
        localStorage.setItem(key, JSON.stringify(filteredStorage));
    };

    const addFavorite = () => {
        writeLS('favorites', itemData._id)
        ++itemData.likes.length
        setFavorites((prevState) => [...prevState, itemData._id]);
        api.addLike(itemData._id)
            .then((addedItem) => {
                alert(`${addedItem.name} добавлен в избранное`)
            })
            .catch(() => {
                alert('Не удалось добавить')
            });
    };

    const removeFavorite = () => {
        removeLS('favorites', itemData._id)
        --itemData.likes.length
        setFavorites((prevState) => prevState.filter((itemID) => itemData._id !== itemID))
        api.deleteLike(itemData._id)
            .then((removeItem) => {
                alert(`${removeItem.name} удален из избранного`)
            })
            .catch(() => {
                alert('Не удалось удалить')
            });
    };

    return (
        <CardMUI sx={{ maxWidth: 340 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {itemData.author.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {itemData.title}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">{itemData.tags}</Button>
                <Button href={itemData.image} target="blank" size="small">image</Button>
                {isInFevorits ? (
                    <IconButton aria-label="add to favorites" onClick={removeFavorite}>
                        <FavoriteIcon /> {itemData.likes.length}
                    </IconButton>
                ) : (
                    <IconButton aria-label="add to favorites" onClick={addFavorite}>
                        <FavoriteBorderOutlinedIcon /> {itemData.likes.length}
                    </IconButton>
                )}
            </CardActions>
        </CardMUI>
    );
};