import { FastifyPluginAsync } from 'fastify';
import { to } from 'await-to-js';
import { Product } from '@/models/product';
import { productsResponseSchema } from '@/schemas/product';
import { ProductImage } from '@/models/product/image';

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
};

export default root;
