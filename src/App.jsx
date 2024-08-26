import { useTheme } from "@teishi/bulma_theme"
import ArticleForm from "./components/ArticleForm";

function App() {

  const {primary, secondary} = useTheme("state");
  return (
    <div className={`box m-4 p-4 has-background-${secondary}`}>
      <h1 className={`title has-text-${primary}`}>Proyecto Final!</h1>
      <ArticleForm/>
    </div>
  )
}

export default App
