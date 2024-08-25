import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import ViewArticleCard from "./ViewArticleCard ";
import ArticleDetail from "./ArticleDetail";

const fetchArticleData = async (articleId) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/articles/${articleId}`);
    const data = await response.json();
    return data;
};


function ShowMyArticle() {
    const { id } = useParams();//Aqui llega el id del articulo a mostrar
    const articleId = id
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const doFetch = async () => {
            try {
                const fetchedArticle = await fetchArticleData(articleId);
                setArticle(fetchedArticle);
            } catch (error) {
                console.error('Error fetching article:', error);
            }
        };

        doFetch();
    }, [articleId]); 

    // Mostrar un indicador de carga si el artículo aún no se ha cargado
    if (!article) return <p>Loading...</p>;

    return (
        <div>
            <ArticleDetail article={article}/>
        </div>
    );
}

export default ShowMyArticle;


