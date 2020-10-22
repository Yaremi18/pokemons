import React, { useState } from 'react'
import {
    HomeWrapper,
    Card,
    Meta,
} from './style'
import { Modal, Button } from 'antd'
import usePokemons from '../../../hooks/usePokemons'

const Home = () => {
    const { loading, pokemons } = usePokemons()

    const [pokemon, setPokemon] = useState()

    if (loading) {
        return 'Loading...'
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
                title={pokemon?.name}
                visible={!!pokemon}
                onCancel={() => setPokemon(undefined)}
                footer={[
                    <Button type="primary" loading={loading} onClick={() => {}}>
                        Submit
                    </Button>
                ]}
            >
                <p>Detail</p>
            </Modal>
        </HomeWrapper>
    )
}

export default Home