import React from 'react';
import '../index.css';
import imageDefaull from '../assets/images/imageDefaull.png';
import { useNavigate } from 'react-router-dom';
import "../style/ArticleDetail.css";

function ArticleDetail({article}) {

    const imageSrc = article.image || imageDefaull;

    const navigate = useNavigate();
    const VolverHome = () => {
        navigate(`/`);
    }
    return (
        <div className="card">
            <div className="card-content">
                <h2 className="title">{article.title}</h2>

                <figure className="image">
                    <img 
                        src={imageSrc}
                        alt={article.title}
                        style={{ width: '30%', height: 'auto' }} 
                    />
                </figure>

                <div className="content">
                    <p>{article.content}</p>
                </div>
                
            </div>

            <div> 
                <button onClick={VolverHome}>
                    Volver
                </button>
            </div>

        </div>

    );
}

export default ArticleDetail;
