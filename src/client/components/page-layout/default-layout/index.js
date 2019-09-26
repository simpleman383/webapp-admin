import React from 'react'
import { FragmentLayout as Layout } from '../../layout'

export default ({ children }) => {

    return (
        <Layout>
            <Layout.Fragment.Vertical>
                "Menu"
            </Layout.Fragment.Vertical>

            <Layout.Fragment.Vertical>
                {children}
            </Layout.Fragment.Vertical>
        </Layout>
    )
}