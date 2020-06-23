import React, { FC } from 'react'
import { useRuntime } from 'vtex.render-runtime'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'

const Setup: FC = () => {
  const { navigate } = useRuntime()

  return (
    <Layout
      pageHeader={
        <PageHeader
          title="Banana"
          linkLabel="Go back to previous page"
          onLinkClick={() =>
            navigate({
              to: `/admin/app/channels-setup`,
            })
          }
        />
      }
    >
      <PageBlock variation="full">
        <h1>Hello, Banana</h1>
      </PageBlock>
    </Layout>
  )
}

export default Setup
