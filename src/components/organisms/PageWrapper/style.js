import styled from 'styled-components'
import { Typography, Layout as LayoutAntd } from 'antd'

export const Title = styled(Typography.Title)`
    color: white !important;
    margin: 0 !important;
`

export const Header = styled(LayoutAntd.Header)`
    display: flex;
    align-items: center;
    height: 10%;
`

export const Content = styled(LayoutAntd.Content)`
    height: 90%;
`

export const Layout = styled(LayoutAntd)`
    height: 100%;
`