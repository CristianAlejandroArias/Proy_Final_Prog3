import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import "../style/ArticleCard.css"; // Importa el archivo CSS

function ArticleCard({ article }) {
    const { title, content, image, author } = article || {};
    const navigate = useNavigate();
    const selectArticle = () => {
        navigate(`/article/${article.id}`);
    }

    const { user__id } = useAuth("state");
    const userIdAsNumber = parseInt(user__id, 10);
    const isVisible = (userIdAsNumber === author);

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
                    <>
                        <button className="button">Modificar</button>
                        <button className="button">Eliminar</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default ArticleCard;
