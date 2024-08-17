import React from 'react';
import { useNavigate } from 'react-router-dom';



function ArticleCard({ article }) {
    // Definir valores predeterminados para los props
    const defaultArticle = {
        title: "Título del Artículo",
        content: "Este es el contenido del artículo. Aquí puedes poner el texto completo del artículo que deseas mostrar.",
        image: "https://via.placeholder.com/800x400" // URL de ejemplo para la imagen
    };

    // Usar el artículo pasado como prop o el predeterminado
    const { title, content, image } = article || defaultArticle;
    const navigate = useNavigate()
    const selectArticle = () => {
        navigate(`/article/${article.id}`)
    }

    return (
        <div className="card has-background-dark" onClick={selectArticle} >
            <div className="card-image">
                {/* Mostrar la imagen si existe */}
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
                        {/* Mostrar el título */}
                        <p className="title is-4 has-text-white">
                            {title}
                        </p>
                    </div>
                </div>
                <div className="content">
                    {/* Mostrar el contenido */}
                    <p>{content}</p>
                </div>
            </div>
        </div>
    );
}

// Definir las propiedades predeterminadas
ArticleCard.defaultProps = {
    article: {
        title: "Título del Artículo",
        content: "Este es el contenido del artículo. Aquí puedes poner el texto completo del artículo que deseas mostrar.",
        image: "https://via.placeholder.com/800x400" // URL de ejemplo para la imagen
    }
};

export default ArticleCard;
