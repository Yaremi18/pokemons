import React, { useCallback, useState } from 'react'
import { Modal, Button, Spin, Typography, notification } from 'antd'
import usePokemons from '../../../hooks/usePokemons'
import PokemonDetail from '../../organisms/PokemonDetail'
import {
    HomeContainer,
    Card,
    Meta,
    CardsContainer,
    Input,
    SelectContainer,
} from './style'

const Home = () => {
    const [page, setPage] = useState(0)
    const { loading, pokemons, getPokemon } = usePokemons(page)
    const [pokemon, setPokemon] = useState()

    const [searchValue, setSearchValue] = useState('')

    const onClose = useCallback(() => {
        setPokemon(undefined)
    }, [])

    const onChangeSearchValue = useCallback(({ target: { value } }) => setSearchValue(value), [])

    const onSearch = useCallback(() => {
        if (!searchValue) {
            notification.warning({
                message: 'Warning',
                description: 'Enter a pokémon identifier or a name',
                duration: 3
            })
            return
        }
        getPokemon(searchValue.toLowerCase())
    }, [searchValue, getPokemon])

    if (loading) {
        return <HomeContainer><Spin /></HomeContainer>
    }
    
    return (
        <HomeContainer>
            <SelectContainer>
                <Typography.Text>Search by: </Typography.Text>
                <Input value={searchValue} onChange={onChangeSearchValue} />
                <Button onClick={onSearch}>Search</Button>
            </SelectContainer>
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