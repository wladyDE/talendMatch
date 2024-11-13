import React from 'react'
import Layout from '../components/layout/Layout'
import CustomMessage from '../components/custom-message/CustomMessage'

const NotFoundPage = () => {
    return (
        <Layout>
            <CustomMessage message='Seite nicht gefunden'/>
        </Layout>
    )
}

export default NotFoundPage