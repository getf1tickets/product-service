import { FastifyPluginAsync } from 'fastify';
import { to } from 'await-to-js';
import { Product, ProductImage } from '@getf1tickets/sdk';
import { productsResponseSchema, productResponseSchema } from '@/schemas/product';

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      response: {
        200: productsResponseSchema,
      },
    },
    handler: async () => {
      const [err, products] = await to<Product[]>(Product.findAll({
        include: [
          {
            model: ProductImage,
            as: 'images',
            limit: 1,
            order: [
              ['createdAt', 'asc'],
            ],
          },
        ],
        order: [
          ['price', 'desc'],
        ],
      }));

      if (err) {
        fastify.log.error(err);
        throw fastify.httpErrors.internalServerError();
      }

      return products.map((product: Product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        cover: product.images[0]?.url,
      }));
    },
  });

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: {
      response: {
        200: productResponseSchema,
      },
    },
    preHandler: [
      fastify.middlewares.useProduct({ includeImages: true, includeTags: true }),
    ],
    handler: async (request) => {
      const { product } = request;
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        images: product.images?.map((image) => image.url) || [],
        tags: product.tags?.map((tag) => tag.tag) || [],
      };
    },
  });
};

export default root;
