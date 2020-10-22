import { Layout } from 'antd'
import React from 'react'
import { Title, Header } from './style'

const { Content } = Layout

const PageWrapper = ({ children, title }) => {
    return (
        <Layout style={{ height: '100%' }}>
            <Header style={{ height: '10%' }}>
                <Title level={2}>{title}</Title>
            </Header>
            <Content style={{ 
    height: '90%', overflow: 'auto'}}>
                {children}
            </Content>
        </Layout>
    )
}

export default PageWrapper