import React from 'react';
import { useNavigate } from 'react-router-dom';



function ViewArticleCard({ article }) {
    const defaultArticle = {
        title: "Título del Artículo",
        content: "Este es el contenido del artículo. Aquí puedes poner el texto completo del artículo que deseas mostrar.",
        image: "https://via.placeholder.com/800x400"
    };

    
    const { title, content, image } = article || defaultArticle;
    const navigate = useNavigate()
    const selectArticle = () => {
        navigate(`/article/${article.id}`)
    }

    return (
        <div className="card has-background-dark" onClick={selectArticle} >
            <div className="card-image">
                {image && (
                    <figure className="image">
                        <img src={image} 
                            alt={title} 
                            style={{ width: '500%', maxWidth: '800px', height: 'auto' }}
                        />
                    </figure>
                )}
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4 has-text-white">
                            {title}
                        </p>
                    </div>
                </div>
                <div className="content">
                    <p>{content}</p>
                </div>
            </div>
        </div>
    );
}


ViewArticleCard.defaultProps = {
    article: {
        title: "Título del Artículo",
        content: "Este es el contenido del artículo. Aquí puedes poner el texto completo del artículo que deseas mostrar.",
        image: "https://via.placeholder.com/800x400" 
    }
};

export default ViewArticleCard;
