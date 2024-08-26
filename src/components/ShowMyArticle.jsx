import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ArticleDetail from "./ArticleDetail";

const fetchArticleData = async (articleId) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/articles/${articleId}`);
    const data = await response.json();
    return data;
};


function ShowMyArticle() {
    const { id } = useParams();
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

    if (!article) return <p>Loading...</p>;

    return (
        <div>
            <ArticleDetail article={article}/>
        </div>
    );
}

export default ShowMyArticle;


