import React, { useMemo } from 'react'
import { Tag, Divider, Spin } from 'antd'
import replaceStrings from '../../../shared/replaceStrings'
import {
    Container,
    ItemsContainer,
    ImagesContainer,
    Row, Col
} from './style'
import usePokemon from '../../../hooks/usePokemon'

const convertToString = (items = []) => {
    if (typeof items === 'string') return items

    return items.reduce((accum, item, index) => {
        if (index === 0) {
            return `${item}, `
        }
        return `${item}, ${accum}`
    })
}

const PokemonDetail = ({ pokemon }) => {
    const { loading, extraDetail } = usePokemon(pokemon)

    // const spritesNames = useMemo(() => Object.keys(pokemon.sprites), [pokemon.sprites])

    console.log(pokemon.sprites)

    if (loading) {
        return <Container><Spin /></Container>
    }

    return (
        <Container>
            <ImagesContainer>
                <img alt={pokemon.name} src={pokemon.sprites.front_default} />
                <img alt={pokemon.name}src={pokemon.sprites.back_default} />
            </ImagesContainer>
            <Row>
                <Col span={12}>
                    <Divider orientation="left">Location areas</Divider>
                    {extraDetail.location_areas.length ? (
                        <ItemsContainer>
                            {convertToString(extraDetail.location_areas)}
                        </ItemsContainer>
                    ) : (
                        <p>This pokémon doesn't have location areas</p>
                    )}
                </Col>
                <Col span={12}>
                    <Divider orientation="left">Types</Divider>
                    <ItemsContainer>
                        {convertToString(pokemon.types)}
                    </ItemsContainer>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Divider orientation="left">Abilities</Divider>
                    <ItemsContainer>
                        {convertToString(pokemon.abilities)}
                    </ItemsContainer>
                </Col>
                <Col span={12}>
                    <Divider orientation="left">Forms</Divider>
                    <ItemsContainer>
                        {convertToString(pokemon.forms)}
                    </ItemsContainer>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Divider orientation="left">Sizes</Divider>
                    <Row>
                        <Col span={12}>
                            <p>Height</p>
                            <p>{`${pokemon.height} mts`}</p>
                        </Col>
                        <Col span={12}>
                            <p>Weight</p>
                            <p>{`${pokemon.weight} kg`}</p>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Divider orientation="left">Moves</Divider>
                    <ItemsContainer>
                        {pokemon.moves.map((move) => (
                            <div key={move}><Tag color="#2db7f5">{move}</Tag></div>
                        ))}
                    </ItemsContainer>
                </Col>
            </Row>
            


            
           

            

            

           
        </Container>
    )
}

export default PokemonDetail