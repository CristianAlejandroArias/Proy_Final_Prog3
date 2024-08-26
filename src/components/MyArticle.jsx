import React, { useEffect, useState, useRef } from "react";
import ArticleCard from "./ArticleCard";
import { useAuth } from "../contexts/AuthContext";
import "../style/MyArticle.css";

function MyArticle() {
    const { user__id } = useAuth("state");
    const { token } = useAuth("actions");

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
            page_size: 100,
            ordering: `-created_at`,
            ...filters,
        }).toString();

        fetch(
            `${import.meta.env.VITE_API_BASE_URL}infosphere/articles/?${query}`,
            {}
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.results) {
                    setArticles((prevArticles) => {
                        const filteredResults = data.results.filter(item => item.author == user__id);
                        return [...prevArticles, ...filteredResults];
                    });
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
    }, [page, filters, user__id]);

    useEffect(() => {
        if (isLoading) return;

        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        observerRef.current = new IntersectionObserver((cards) => {
            if (cards[0].isIntersecting && nextUrl) {
                setPage((prevPage) => prevPage + 1);
            }
        });

        if (lastArticleElementRef.current) {
            observerRef.current.observe(lastArticleElementRef.current);
        }
    }, [isLoading, nextUrl]);

    if (isError) return <p>Error al cargar los artículos.</p>;
    if (!articles.length && !isLoading) return <p>No hay artículos disponibles</p>;

    const handleDelete = (idArticle) => {//*
        setArticles((prevArticles) => prevArticles.filter((article) => article.id !== idArticle));
    };


    return (
            <div className="myContenedor">
                <h2 className="title">Mis Artículos</h2>
                <ul>
                    {articles.map((article, index) => {
                        if (articles.length === index + 1) {
                            return (
                                <div
                                    key={article.id}
                                    ref={lastArticleElementRef}
                                    className="column is-two-thirds"
                                    onDelete={handleDelete}
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
                                    className="column is-two-thirds"
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
                {isLoading && <p>Cargando más artículos...</p>}
            </div>

    );
}

export default MyArticle;
