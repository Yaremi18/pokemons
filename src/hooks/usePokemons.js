import { useCallback, useEffect, useState } from 'react'

const usePokemons = () => {
    const [loading, setLoading] = useState(true)
    const [pokemons, setPokemons] = useState([])

    const getPokemons = useCallback(async () => {
        console.log("Enter here")
        try {
            const responseUrls = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
            const _pokemonsFetch = (await responseUrls.json()).results || []

            const _pokemons = await Promise.all(_pokemonsFetch.map(async(pokemon) => {
                const responseData = await fetch(pokemon.url)
                return responseData.json()
            }))

            setPokemons(_pokemons)
        } catch (e) {
            console.log(e.message)
        }
        setLoading(false)
    }, [])

    useEffect(() => {
        getPokemons()
    }, [])

    return { loading, pokemons }
}

export default usePokemons
