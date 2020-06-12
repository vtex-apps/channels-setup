import { UserInputError } from '@vtex/api'

import CHANNEL_SCHEMA_BODY from '../schemas/channelRequests'
import { CHANNEL_REQUESTS_ENTITY, CHANNEL_REQUESTS_SCHEMA } from './constants'

export const validateRequest = (
  ctx: Context,
  account: string,
  isSeller: boolean
) =>
  ctx.clients.masterdata
    .searchDocuments({
      dataEntity: CHANNEL_REQUESTS_ENTITY,
      fields: ['id'],
      pagination: {
        page: 1,
        pageSize: 1,
      },
      schema: CHANNEL_REQUESTS_SCHEMA,
      where: `${isSeller ? 'requested' : 'requester'}=${account}`,
    })
    .then(res => {
      if (res.length > 0) {
        throw new UserInputError(
          `Request with this ${
            isSeller ? 'marketplace' : 'seller'
          } has already been created`
        )
      }
    })

export const updateSchema = (ctx: Context) =>
  ctx.clients.masterdata
    .createOrUpdateSchema({
      dataEntity: CHANNEL_REQUESTS_ENTITY,
      schemaBody: CHANNEL_SCHEMA_BODY,
      schemaName: CHANNEL_REQUESTS_SCHEMA,
    })
    .catch(err => {
      if (err.response.status !== 304) {
        throw err
      }
    })
