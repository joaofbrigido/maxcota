type StripeProduct = {
  productPriceId: string;
  name: string;
};

export function getStripeProduct(
  productName: string
): StripeProduct | undefined {
  const products = [
    {
      productPriceId: process.env.STRIPE_STANDARD_PRICE_ID,
      name: "standard",
    },
    {
      productPriceId: process.env.STRIPE_PRO_PRICE_ID,
      name: "pro",
    },
  ] as StripeProduct[];

  return products.find((product) => product.name === productName);
}
