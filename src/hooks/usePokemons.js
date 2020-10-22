import { notification } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import replaceStrings from '../shared/replaceStrings'

let limit = 30

const formatData = (pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    height: pokemon.height / 10, // Convert to meters
    weight: pokemon.weight / 10, // Convert to kg
    types: pokemon.types.map((item) => replaceStrings(item.type.name, ['-'])),
    abilities: pokemon.abilities.map((item) => replaceStrings(item.ability.name, ['-'])),
    moves: pokemon.moves.map((item) => replaceStrings(item.move.name, ['-'])),
    forms: pokemon.forms.map((form) => replaceStrings(form.name, ['-'])),
    sprites: pokemon.sprites,
    location_area_encounters: pokemon.location_area_encounters,
})

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

            if (responseUrls.status !== 200) {
                notification.error({
                    message: 'Error',
                    description: 'There was an error',
                    duration: 3
                })
                return
            }

            const _pokemonsFetch = (await responseUrls.json()).results

            const _pokemons = await Promise.all(_pokemonsFetch.map(async(pokemon) => {
                const responseData = await fetch(pokemon.url)
                const _pokemon = await responseData.json()

                return formatData(_pokemon)
            }))

            setPokemons(prev => [...prev, ..._pokemons])
        } catch (e) {
            notification.error({
                message: 'Error',
                description: e.message,
                duration: 3
            })
        }
        setLoading(false)
    }, [page])

    const getPokemon = useCallback(async (searchValue) => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
        if (response.status === 404) {
            notification.warning({
                message: 'Warning',
                description: 'Pokemon not found',
                duration: 3
            })
            return
        }
        const _pokemon = await response.json()

        setPokemons([formatData(_pokemon)])
    }, [])

    useEffect(() => {
        getPokemons()
    }, [getPokemons])

    return { loading, pokemons, getPokemon }
}

export default usePokemons
