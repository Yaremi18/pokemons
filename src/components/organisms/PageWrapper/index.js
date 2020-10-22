import { Layout } from 'antd'
import React from 'react'
import { Title, Header } from './style'

const { Content } = Layout

const PageWrapper = ({ children, title }) => {
    return (
        <Layout>
            <Header>
                <Title level={2}>{title}</Title>
            </Header>
            <Content>
                {children}
            </Content>
        </Layout>
    )
}

export default PageWrapper