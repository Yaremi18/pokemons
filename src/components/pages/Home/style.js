import styled from 'styled-components'
import {
    Typography,
    Card as CardAntd,
} from 'antd'

export const HomeContainer = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: 100%;
`

export const Title = styled(Typography.Title)`
    // color: blue !important;
`

export const Card = styled(CardAntd)`
    margin: 5px;
    width: 200px;
`

export const Meta = styled(CardAntd.Meta)`
    display: flex;
    align-items: center;
    justify-content: center;
`