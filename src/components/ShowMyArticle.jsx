import React, { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import ViewArticleCard from "./ViewArticleCard ";
import ArticleDetail from "./ArticleDetail";

const fetchArticleData = async (articleId) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/infosphere/articles/${articleId}`);
    const data = await response.json();
    return data;
};


function ShowMyArticle() {
    const { id } = useParams();//Aqui llega el id del articulo a mostrar
    console.log({ id })
    const articleId = id
    console.log({articleId})
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const doFetch = async () => {
            try {
                const fetchedArticle = await fetchArticleData(articleId);
                console.log(fetchedArticle)
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
{/*             <h1>Detalle del ítem con ID: {id}</h1> */}
            <ArticleDetail article={article}/>
        </div>
    );
}

export default ShowMyArticle;


