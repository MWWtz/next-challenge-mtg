export const createPath = (id, brand) => {
  const formatbrand = brand.replace(/\s+/g, "-");
  const path = `/${id}-${formatbrand}`;
  return path;
};

export const getId = (idBrand) => {
  const id = idBrand.split("-")[0];
  return id;
};

export const formatCurrency = (priceInCents) => {
  const priceInDollars = (priceInCents / 100).toFixed(2);
  return priceInDollars;
};
