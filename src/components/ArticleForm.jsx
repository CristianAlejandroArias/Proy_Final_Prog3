import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../style/ArticleForm.css"; // Asegúrate de importar el archivo CSS

export default function ArticleForm() {
    const { token } = useAuth("state");
    const navigate = useNavigate();

    const [articleData, setArticleData] = useState({ title: "", content: "" });
    const [articleImage, setArticleImage] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    function handleInputChange(event) {
        setArticleData({
            ...articleData,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Enviando formulario.");

        const newForm = new FormData();
        newForm.append("title", articleData.title);
        newForm.append("content", articleData.content);
        if (articleImage) {
            newForm.append("image", articleImage);
        }

        fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/articles/`, {
            method: "POST",
            headers: {
                Authorization: `Token ${token}`,
            },
            body: newForm,
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("No se pudo crear el artículo");
            }
            return response.json();
        })
        .then((data) => {
            alert('El artículo fue creado con éxito.');
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
