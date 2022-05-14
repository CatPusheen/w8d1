import React from 'react';
import style from './style.module.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import FaceIcon from '@mui/icons-material/Face';

const styles = {
    textName: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '1.5em',
        fontFamily: 'cursive'
    },
}

function getContact() {
    alert('Есть контакт!');
};

export const Header = ({ name, favorites }) => {
    return (
        <div >
            <div className={style.header}>
                <h1>PostProject</h1>
                <div style={styles.textName}>
                    <div>
                    <Chip icon={<FaceIcon />} label={name} />
                    </div>
                    <div> В избранном {favorites.length} <FavoriteIcon /> </div>
                </div>
                <div>
                <Button onClick={getContact} variant="outlined">Click me</Button>
                </div>
            </div>
            <div className={style.headerText}>
                <div>Welcome to Post Project 👋</div>
            </div>
        </div>
    );
};
