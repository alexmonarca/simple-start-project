import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import {
  getProducts,
  getProductById,
  searchProducts,
  getCartItems,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  getFavorites,
  addToFavorites,
  removeFromFavorites,
  getUserOrders,
  getOrderById,
  getOrderItems,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Produtos
  products: router({
    list: publicProcedure.query(async () => {
      return getProducts();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getProductById(input.id);
      }),
    search: publicProcedure
      .input(z.object({ query: z.string().optional(), category: z.string().optional() }))
      .query(async ({ input }) => {
        return searchProducts(input.query || "", input.category);
      }),
  }),

  // Carrinho
  cart: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getCartItems(ctx.user.id);
    }),
    add: protectedProcedure
      .input(z.object({ productId: z.number(), quantity: z.number().min(1) }))
      .mutation(async ({ ctx, input }) => {
        return addToCart(ctx.user.id, input.productId, input.quantity);
      }),
    remove: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        return removeFromCart(input.id);
      }),
    updateQuantity: protectedProcedure
      .input(z.object({ id: z.number(), quantity: z.number().min(1) }))
      .mutation(async ({ input }) => {
        return updateCartItemQuantity(input.id, input.quantity);
      }),
  }),

  // Favoritos
  favorites: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getFavorites(ctx.user.id);
    }),
    add: protectedProcedure
      .input(z.object({ productId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return addToFavorites(ctx.user.id, input.productId);
      }),
    remove: protectedProcedure
      .input(z.object({ productId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return removeFromFavorites(ctx.user.id, input.productId);
      }),
  }),

  // Pedidos
  orders: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserOrders(ctx.user.id);
    }),
    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getOrderById(input.id);
      }),
    getItems: protectedProcedure
      .input(z.object({ orderId: z.number() }))
      .query(async ({ input }) => {
        return getOrderItems(input.orderId);
      }),
  }),
});

export type AppRouter = typeof appRouter;
