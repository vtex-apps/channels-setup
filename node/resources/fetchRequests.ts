import {
  CHANNEL_REQUESTS_ENTITY,
  CHANNEL_REQUESTS_SCHEMA,
} from '../utils/constants'

const formatWhere = (requested?: string, requester?: string) =>
  [
    ...(requested ? [`requested=${requested}`] : []),
    ...(requester ? [`requester=${requester}`] : []),
  ].join(' AND ')

export const fetchRequests = async (
  ctx: Context,
  requested?: string,
  requester?: string
) =>
  ctx.clients.masterdata.searchDocuments({
    dataEntity: CHANNEL_REQUESTS_ENTITY,
    fields: [
      'affiliateId',
      'salesChannels',
      'settings',
      'status',
      'requester',
      'requested',
    ],
    pagination: {
      page: 1,
      pageSize: 100,
    },
    schema: CHANNEL_REQUESTS_SCHEMA,
    where: formatWhere(requested, requester),
  })
