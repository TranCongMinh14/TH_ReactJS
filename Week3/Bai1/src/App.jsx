import { useState } from 'react'

import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
    </>
  )
}

export default App
