import { notification } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import replaceStrings from '../shared/replaceStrings'

let limit = 30

const usePokemons = (page) => {
    const [loading, setLoading] = useState(true)
    const [pokemons, setPokemons] = useState([])

    const getPokemons = useCallback(async () => {
        try {
            let offset = page * 30
    
            if (offset > 149 ) {
                offset = 150
                limit = 1
            }

            const responseUrls = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
            const _pokemonsFetch = (await responseUrls.json()).results || []

            const _pokemons = await Promise.all(_pokemonsFetch.map(async(pokemon) => {
                const responseData = await fetch(pokemon.url)
                const _pokemon = await responseData.json()

                return {
                    id: _pokemon.id,
                    name: _pokemon.name,
                    height: _pokemon.height / 10, // Convert to meters
                    weight: _pokemon.weight / 10, // Convert to kg
                    types: _pokemon.types.map((item) => replaceStrings(item.type.name, ['-'])),
                    abilities: _pokemon.abilities.map((item) => replaceStrings(item.ability.name, ['-'])),
                    moves: _pokemon.moves.map((item) => replaceStrings(item.move.name, ['-'])),
                    forms: _pokemon.forms.map((form) => replaceStrings(form.name, ['-'])),
                    sprites: _pokemon.sprites,
                    location_area_encounters: _pokemon.location_area_encounters,
                }
            }))

            setPokemons(prev => [...prev, ..._pokemons])
        } catch (e) {
            notification.error({
                message: 'Error',
                description: e.message,
            })
        }
        setLoading(false)
    }, [page])

    useEffect(() => {
        getPokemons()
    }, [getPokemons])

    return { loading, pokemons }
}

export default usePokemons
