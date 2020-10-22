import React from 'react'
import { Layout, Title, Header, Content } from './style'

const PageWrapper = ({ children, title }) => (
    <Layout>
        <Header>
            <Title level={2}>{title}</Title>
        </Header>
        <Content>
            {children}
        </Content>
    </Layout>
)

export default PageWrapper