import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation} from "react-router-dom";
import "../style/ArticleForm.css"; 

export default function ArticleForm() {
    const { token } = useAuth("state");
    const navigate = useNavigate();
    const location = useLocation();

    const articleExisting = location.state?.article || null;

    const [articleData, setArticleData] = useState({ title: "", content: "" });
    const [articleImage, setArticleImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (articleExisting){
            setArticleData({
                title: articleExisting.title,
                content: articleExisting.content,                
            })
        }
    },[articleExisting])

    function handleInputChange(event) {
        setArticleData({
            ...articleData,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const newForm = new FormData();
        newForm.append("title", articleData.title);
        newForm.append("content", articleData.content);
        if (articleImage) {
            newForm.append("image", articleImage);
        }

        const methodSelect = articleExisting ? 'PATCH': 'POST';
        const urlSelect = articleExisting 
            ? `infosphere/articles/${articleExisting.id}`
            :'infosphere/articles/';

        
        fetch(`${import.meta.env.VITE_API_BASE_URL}${urlSelect}`, {
            method: methodSelect,
            headers: {
                Authorization: `Token ${token}`,
            },
            body: newForm,
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("No se pudo realizar la operacion.");
            }
            return response.json();
        })
        .then((data) => {
            alert('Operacio realizada con éxito.');
            navigate('/');
        })
        .catch((error) => {
            console.error("Error al crear el artículo", error);
        })
        .finally(() => {
            setSubmitting(false);
        });
    }

    function handleImageChange(event) {
        setArticleImage(event.target.files[0]);
    }

    return (
        <form
            className="form-container"
            onSubmit={handleSubmit}
        >
            <h1>Agregar Noticia</h1>

            <div className="field">
                <label className="label">Nombre</label>
                <div className="control">
                    <input
                        className="input"
                        name="title"
                        value={articleData.title}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Contenido</label>
                <div className="control">
                    <textarea
                        className="textarea"
                        name="content"
                        value={articleData.content}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Imagen:</label>
                <div className="control">
                    <input
                        className="input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <button className="button is-primary" type="submit">
                        Enviar
                    </button>
                </div>
            </div>
        </form>
    );
}
