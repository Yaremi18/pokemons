import React, { useCallback, useState } from 'react'
import {
    HomeContainer,
    Card,
    Meta,
    CardsContainer,
} from './style'
import { Modal, Button, Spin } from 'antd'
import usePokemons from '../../../hooks/usePokemons'
import PokemonDetail from '../../organisms/PokemonDetail'

const Home = () => {
    const [page, setPage] = useState(0)
    const { loading, pokemons } = usePokemons(page)
    const [pokemon, setPokemon] = useState()

    const onClose = useCallback(() => {
        setPokemon(undefined)
    }, [])

    if (loading) {
        return <HomeContainer><Spin /></HomeContainer>
    }
    
    return (
        <HomeContainer>
            <CardsContainer>
                {pokemons.map((pokemon) => (
                    <Card
                        key={pokemon.name}
                        hoverable
                        cover={
                            <img alt={pokemon.name} src={pokemon.sprites.front_default} />
                        }
                        onClick={() => setPokemon(pokemon)}
                    >
                        <Meta title={pokemon.name.toUpperCase()} />
                    </Card>
                ))}
            </CardsContainer>
            {page < 5 && <Button onClick={() => setPage(prev => prev + 1)}>Load more</Button>}
            <Modal
                width={1000}
                centered
                title={pokemon?.name.toUpperCase()}
                visible={!!pokemon}
                onCancel={onClose}
                footer={[
                    <Button key="back" type="primary" loading={loading} onClick={onClose}>
                        Back
                    </Button>
                ]}
            >
                {pokemon && <PokemonDetail pokemon={pokemon} />}
            </Modal>
        </HomeContainer>
    )
}

export default Home