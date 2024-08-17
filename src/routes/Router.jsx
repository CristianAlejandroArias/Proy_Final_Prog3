import { createBrowserRouter } from "react-router-dom";
import ArticleForm from "../components/ArticleForm";
import ArticleList from "../components/ArticleList";
import Layout from "./Layout";
import Home from "../components/Home";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/Auth/Login";
import MyArticle from "../components/MyArticle";
import ShowMyArticle from "../components/ShowMyArticle";


const Router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true, // path: "/"
                element: <Home />,
            },
            {
                path: "articles",
                element: (
                    <ProtectedRoute>
                        <ArticleForm />
                    </ProtectedRoute>
                ),
            },
            {
                path: "my/article",
                element: (
                    <ProtectedRoute>
                        <MyArticle/>
                    </ProtectedRoute>
                ),
            },
            {
                path: "login",
                element: <Login />,
            },
            
            {
                path: "article/:id",
                element: <ShowMyArticle/>
            }, 

        ],
    },
    {
        path: "*",
        element: <h1>Not Found</h1>,
    },
]);

export { Router };
