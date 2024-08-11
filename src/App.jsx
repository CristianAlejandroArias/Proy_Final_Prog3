/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css' */

import { useTheme } from "@teishi/bulma_theme"
import ArticleForm from "./components/ArticleForm";

function App() {
//  const [count, setCount] = useState(0)
  const {primary, secondary} = useTheme("state");
  return (
    <div className={`box m-4 p-4 has-background-${secondary}`}>
      <h1 className={`title has-text-${primary}`}>Proyecto Final!</h1>
      <ArticleForm/>
    </div>
  )
}

export default App
