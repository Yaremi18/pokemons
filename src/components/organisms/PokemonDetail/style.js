import styled from 'styled-components'
import {
    Row as RowAntd,
    Col as ColAntd,
} from 'antd'


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 500px;
    overflow: auto;
    align-items: center;
`

export const Row = styled(RowAntd)`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`
export const Col = styled(ColAntd)`
    width: 100%;

    min-width: 200px;
    padding: 10px;
`

export const ItemsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    max-height: 150px;
    > span {
        margin: 3px;
    }
`

export const ImagesContainer = styled.div`
    width: 30%;
    min-width: 200px;
    display: flex;
`

export const ImageContainer = styled.div`
    width: 200px;
    height: 200px;
`