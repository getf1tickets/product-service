// eslint-disable-next-line import/prefer-default-export
export const productsResponseSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      price: { type: 'number' },
      cover: { type: 'string', format: 'uri' },
    },
  },
};
