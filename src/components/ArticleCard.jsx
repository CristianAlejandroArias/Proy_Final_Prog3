import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import "../style/ArticleCard.css"

function ArticleCard({ article }) {

    const { title, content, image, author } = article || defaultArticle;
    const navigate = useNavigate()
    const selectArticle = () => {
        navigate(`/article/${article.id}`)
    }

    const { user__id } = useAuth("state")
    const { token } = useAuth("actions")
    const userIdAsNumber = parseInt(user__id, 10);
    const isVisible = (userIdAsNumber == author);

    return (
        <div className="card" onClick={selectArticle} >
                    <div className="media-content">
                        {/* Mostrar el título */}
                        <p className="title">
                            {title}
                        </p>
                    </div>
            <div className="cardI">
                {/* Mostrar la imagen si existe */}
                {image && (
                    <figure >
                        <img className="image1" 
                            src={image}
                            alt={title}
                        />
                    </figure>
                )}
            </div>
            <div className="card-content">
                <div className="media">
                </div>
                <div className="content">
                    {/* Mostrar el contenido */}
                    <p>{content}</p>
                </div>

            </div>
                <div>
                {isVisible && (
                    <button className="button">
                        Modificar
                    </button>
                )}
                {isVisible && (
                    <button className="button">
                        Eliminar
                    </button>
                )}

                </div>
        </div>
    );
}



export default ArticleCard;
