export default {
  properties: {
    requested: {
      type: 'string',
    },
    requester: {
      type: 'string',
    },
    salesChannels: {
      items: {
        properties: {
          affiliateId: {
            type: 'string',
          },
          mkp: {
            type: 'integer',
          },
          seller: {
            type: 'integer',
          },
        },
        type: 'object',
      },
      type: 'array',
    },
    settings: {
      properties: {
        customConfig: {
          properties: {
            active: {
              type: 'boolean',
            },
            form: {
              type: 'object',
            },
          },
          required: ['active'],
          type: 'object',
        },
        imageUrl: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        salesChannels: {
          items: {
            properties: {
              commissioning: {
                properties: {
                  categories: {
                    items: {
                      properties: {
                        id: {
                          type: 'string',
                        },
                        value: {
                          type: 'number',
                        },
                      },
                      type: 'object',
                    },
                    type: 'array',
                  },
                  freight: {
                    type: 'number',
                  },
                  product: {
                    type: 'number',
                  },
                },
                type: 'object',
              },
              description: {
                type: 'string',
              },
              id: {
                type: 'integer',
              },
              name: {
                type: 'string',
              },
              payment: {
                type: 'string',
              },
            },
            type: 'object',
          },
          type: 'array',
        },
      },
      type: 'object',
    },
    status: {
      type: 'string',
    },
  },
  'v-indexed': ['requester', 'requested'],
}
