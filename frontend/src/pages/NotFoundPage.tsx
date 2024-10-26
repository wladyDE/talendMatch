import React from 'react'
import Layout from '../components/layout/Layout'
import { centeredFlexBox } from '../styles/styles'

const NotFoundPage = () => {
    return (
        <Layout>
            <div style={{
                ...centeredFlexBox('center'),
                height: '100vh',
            }}>
                <h2 style={{ textAlign: 'center', margin: 0 }}>Seite nicht gefunden</h2>
            </div>
        </Layout>
    )
}

export default NotFoundPage