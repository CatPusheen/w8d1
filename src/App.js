import React, { useState, useEffect } from 'react';
import api from './components/utils/api.js'

import { Header } from './components/Header';
import { Cards } from './components/ListCards';
import { Footer } from './components/Footer';

export const App = () => {

    const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')) || []);
    const [user, setUser] = useState(null)
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        api.getCurentUser().then((user) => setUser(user))
    }, [])
    useEffect(() => {
        api.getPosts().then((data_posts) => setPosts(data_posts))
    }, [])
    useEffect(() => {
        api.letUser().then((user_new) => setUser(user_new))
    }, [])

    return (
        <div style={{ backgroundColor: 'rgb(221, 251, 255)' }}>
            <Header name={user?.name} favorites={favorites} />
            <Cards posts={posts} favorites={favorites} setFavorites={setFavorites} />
            <Footer />
        </div>
    );
};