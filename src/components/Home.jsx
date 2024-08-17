import { useAuth } from "../contexts/AuthContext";
import ArticleCard from "./ArticleCard";
import ArticleList from "./ArticleList";
import MyArticle from "./MyArticle";

export default function Home() {
    const {user__id} = useAuth("state")
    const {token} = useAuth("actions")
    return (
        <div>
            <h1>Bienvenido al home.</h1>
            <ArticleList/>
        </div>
    );
}
