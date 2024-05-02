import { Link } from 'react-router-dom'
import './App.css'
import Posts from './components/Posts'

function App() {
  return (
    <>
      <header>
        <h1>Posts</h1>
      </header>
      <main>
        <Link to="/posts/new">
          Create post
        </Link>
        <Posts />
      </main>
    </>
  )
}

export default App
