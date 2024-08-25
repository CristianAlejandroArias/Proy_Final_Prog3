import React, { useEffect, useState, useRef } from "react";
import ArticleCard from "./ArticleCard";
import "../style/ArticleList.css"; 

function ArticleList() {
    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [nextUrl, setNextUrl] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState({});

    const observerRef = useRef();
    const lastArticleElementRef = useRef();

    const doFetch = async () => {
        setIsLoading(true);
        let query = new URLSearchParams({
            page: page,
            page_size: 5,
            ordering: `-created_at`,
            ...filters,
        }).toString();

        fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/articles/?${query}`, {})
            .then((response) => response.json())
            .then((data) => {
                if (data.results) {
                    setArticles((prevArticles) => [...prevArticles, ...data.results]);
                    setNextUrl(data.next);
                }
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        doFetch();
    }, [page, filters]);

    useEffect(() => {
        if (isLoading) return;

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && nextUrl) {
                setPage((prevPage) => prevPage + 1);
            }
        });

        if (lastArticleElementRef.current) {
            observerRef.current.observe(lastArticleElementRef.current);
        }
    }, [isLoading, nextUrl]);

    if (isError) return <p className="message">Error al cargar los artículos.</p>;
    if (!articles.length && !isLoading) return <p className="message">No hay artículos disponibles</p>;

    const handleDelete = (idArticle) => {//*
        setArticles((prevArticles) => prevArticles.filter((article) => article.id !== idArticle));
    };
    
    return (
        <div className="article-list-container">
            <h2 className="title">Lista de Artículos</h2>
            <ul>
                {articles.map((article, index) => {
                    if (articles.length === index + 1) {
                        return (
                            <div
                                key={article.id}
                                ref={lastArticleElementRef}
                                className="article-card"
                            >
                                <ArticleCard 
                                article={article}
                                onDelete={handleDelete}
                                />
                            </div>
                        );
                    } else {
                        return (
                            <div
                                key={article.id}
                                className="article-card"
                            >
                                <ArticleCard 
                                article={article} 
                                onDelete={handleDelete}
                                />
                            </div>
                        );
                    }
                })}
            </ul>
            {isLoading && <p className="loading-message">Cargando más artículos...</p>}
        </div>
    );
}

export default ArticleList;
