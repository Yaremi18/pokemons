import { useCallback, useEffect, useState } from "react"
import replaceStrings from '../shared/replaceStrings'
/**
 * Custom hook that retrieves extra detail as:
 * location_areas: array
 * @param {object} pokemon Object with pokemon data
 * @return {object} Return an object with { loading, extraDetail }
 */
const usePokemon = (pokemon) => {
    const [loading, setLoading] = useState(true)
    const [extraDetail, setExtraDetail] = useState({})
    
    const getExtraDetail = useCallback(async () => {
        const areasResponse = await fetch(pokemon.location_area_encounters)
        const areas = await areasResponse.json()

        setExtraDetail({
            location_areas: areas.map((item) => replaceStrings(item.location_area.name, ['-', 'area']))
        })
        setLoading(false)
    }, [pokemon])

    useEffect(() => {
        getExtraDetail()
    }, [getExtraDetail])

    return { extraDetail, loading }
}

export default usePokemon