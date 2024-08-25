
//import ArticleCard from "./ArticleCard";
import ArticleList from "./ArticleList";
//import MyArticle from "./MyArticle";

const homeStyle = {
    color: 'black',
    textAlign: 'center'
};

function Home() {
    return (
        <div>
            <h1 style={homeStyle}>Bienvenido al home.</h1>
            <ArticleList />
        </div>
    );
}

export default Home;
