
import ArticleList from "./ArticleList";

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
