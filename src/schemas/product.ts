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

export const productCreationSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['name', 'description', 'price', 'images'],
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
    price: { type: 'number', minimum: 0 },
    images: {
      type: 'array',
      items: { type: 'string', format: 'uri' },
    },
  },
};

export const productResponseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid' },
    name: { type: 'string' },
    price: { type: 'number' },
    cover: { type: 'string', format: 'uri' },
    images: {
      type: 'array',
      items: { type: 'string' },
    },
    tags: {
      type: 'array',
      items: { type: 'string' },
    },
    description: { type: 'string' },
  },
};
