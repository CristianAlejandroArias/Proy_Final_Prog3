import React, { useEffect, useState, useRef } from "react";
import ArticleCard from "./ArticleCard";
import { useAuth } from "../contexts/AuthContext";

function MyArticle() {
    
    const {user__id} = useAuth("state")
    const {token} = useAuth("actions")

    const [page, setPage] = useState(1);
    const [articles, setArticles] = useState([]);//VAriable de estado de articulo
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
            `${import.meta.env.VITE_API_BASE_URL}/infosphere/articles/?${query}`,
            {}
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.results) {
                    setArticles((prevArticles) => {
                        //filtra solo mis articulos
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
    }, [page, filters]);

    useEffect(() => {
        // Si la petición esta en proceso no creamos observador
        if (isLoading) return;

        // Si hay otro observador definido lo desuscribimos
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        // Creamos y referenciamos el observador de tarjetas actual
        observerRef.current = new IntersectionObserver((cards) => {
            // Observamos todas las tarjetas de la nueva página cargada
            if (cards[0].isIntersecting && nextUrl) {
                setPage((prevPage) => prevPage + 1);
            }
        });

        // Actualizamos la referencia al última tarjeta
        if (lastArticleElementRef.current) {
            observerRef.current.observe(lastArticleElementRef.current);
        }
    }, [isLoading, nextUrl]);


    if (isError) return <p>Error al cargar los articulos.</p>;
    if (!articles.length && !isLoading) return <p>No hay articulos disponibles</p>;

    return (
        <div>
            <div className="my-5">
                <h2 className="title">Lista de Articulos</h2>
                <ul>
                    {articles.map((article, index) => {
                        if (articles.length === index + 1) {
                            return (
                                <div
                                    key={article.id}
                                    ref={lastArticleElementRef}
                                    className="column is-two-thirds"
                                >
                                    <ArticleCard article={article} />
                                </div>
                            );
                        } else {
                            return (
                                <div
                                    key={article.id}
                                    className="column is-two-thirds"
                                >
                                    <ArticleCard article={article} />
                                </div>
                            );
                        }
                    })}
                </ul>
                {isLoading && <p>Cargando más articulos...</p>}
            </div>
        </div>
    );
}

export default MyArticle;
