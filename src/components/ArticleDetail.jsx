import React from 'react';
import '../index.css';
import imageDefaull from '../assets/images/imageDefaull.png';

function ArticleDetail({article}) {

    const imageSrc = article.image || imageDefaull;

    return (
        <div className="card">
            <div className="card-content">
                {/* Mostrar el título */}
                <h2 className="title">{article.title}</h2>

                {/* Mostrar la imagen si existe */}
                <figure className="image">
                    <img 
                        src={imageSrc}
                        alt={article.title}
                        style={{ width: '100%', height: 'auto' }} 
                    />
                </figure>

                {/* Mostrar el contenido */}
                <div className="content">
                    <p>{article.content}</p>
                </div>
            </div>
        </div>
    );
}

export default ArticleDetail;
