import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import "../style/ArticleCard.css";

function ArticleCard({ article, onDelete }) {
    const { title, content, image, author } = article || {};
    const [isModalOpen, setIsModalOpen] = useState(false);//*

    const navigate = useNavigate();
    const selectArticle = () => {
        navigate(`/article/${article.id}`);
    }

    const { user__id } = useAuth("state");
    const { token } = useAuth("state");//*
    const userIdAsNumber = parseInt(user__id, 10);
    const isVisible = (userIdAsNumber === author);

    const handleDelete = async () => {//*
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/infosphere/articles/${article.id}/`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${token}`, // Asegúrate de que `token` esté definido
                    },
                }
            );

            if (!response.ok) {
                throw new Error("No se pudo eliminar el Articulo");
            }

            onDelete(article.id);
        } catch (error) {
            console.error("Error al eliminar el articulo", error);
        } finally {
            setIsModalOpen(false);
        }
    };

    const handleEdit = () => {//*
        alert("Editar Articulos");
    };

    return (
        <div className="card" onClick={selectArticle}>
            <div className="media-content">
                <p className="title">{title}</p>
            </div>
            <div className="cardI">
                {image && (
                    <figure>
                        <img className="image1" src={image} alt={title} />
                    </figure>
                )}
            </div>
            <div className="card-content">
                <div className="content">
                    <p>{content}</p>
                </div>
            </div>
            <div>
                {isVisible && (
                    <div className="c-botones">
                        <button
                            className="b-eliminar"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsModalOpen(true);
                            }}
                        >
                            Eliminar
                        </button>
                        <button
                            className="b-editar"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEdit();
                            }}
                        >
                            Editar
                        </button>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className={`modal ${isModalOpen ? "is-active" : ""}`}
                    onClick={(e) => e.stopPropagation()}>
                    <div className="modal-background">
                        {/* eliminar este div*/}
                    </div>
                    <div className="modal-content">
                        <div className="box">
                            <p>¿Está seguro que desea eliminar el artículo?</p>
                            <div className="button-group">
                                <button className="button submit-button" onClick={handleDelete}>
                                    Eliminar
                                </button>
                                <button
                                    className="button cancel-button"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                    <button
                        className="modal-close is-large"
                        aria-label="close"
                        onClick={() => setIsModalOpen(false)}
                    ></button>
                </div>
            )}
        </div>
    );
}

export default ArticleCard;
