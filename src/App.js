import React from 'react'
import './App.css'
import PageWrapper from './components/organisms/PageWrapper'
import Home from './components/pages/Home'

function App() {
  return (
    <PageWrapper title="Pokemons">
      <Home />
    </PageWrapper>
  )
}

export default App
