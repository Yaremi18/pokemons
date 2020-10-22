import React, { useCallback, useState } from 'react'
import {
    HomeWrapper,
    Card,
    Meta,
} from './style'
import { Modal, Button, Spin } from 'antd'
import usePokemons from '../../../hooks/usePokemons'
import PokemonDetail from '../../organisms/PokemonDetail'

const Home = () => {
    const { loading, pokemons } = usePokemons()

    const [pokemon, setPokemon] = useState()

    const onClose = useCallback(() => {
        setPokemon(undefined)
    }, [])

    if (loading) {
        return <HomeWrapper><Spin /></HomeWrapper>
    }
    
    return (
        <HomeWrapper>
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
        </HomeWrapper>
    )
}

export default Home