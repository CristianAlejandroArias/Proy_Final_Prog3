import { useState, useEffect } from "react";

export default function ArticleForm() {
    const [articleData, setAticleData] = useState({ title: "", content: "" });

    function handleInputChange(event) {
        setAticleData({
            ...articleData,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Enviando formulario.")
        console.log(JSON.stringify(articleData))
        fetch(`${import.meta.env.VITE_API_BASE_URL}infosphere/articles/`,
        {   
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
            },
            body: JSON.stringify(articleData),

        });
    }

    return (
        <form
            className={`box m-4 p-4 has-background-dark`}
            onSubmit={handleSubmit}
        >
            <h1 style={{ color: 'red' }}>Agregar Noticia</h1>
            
            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <input
                        className="input"
                        //type="text"
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
                        //type="text"
                        name="content"
                        value={articleData.content}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <button className="button is-primary" type="submit">
                        Submit
                    </button>
                </div>
            </div>
        </form>);
}