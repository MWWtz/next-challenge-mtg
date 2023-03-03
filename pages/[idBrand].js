import { createPath, formatCurrency, getId } from "@/lib/helpers";
import Image from "next/image";
import Link from "next/link";
import styles from "styles/ProductDetailPage.module.css";

export default function ProductDetailsPage({ product, skus }) {
  if (product === undefined || skus === undefined) {
    return <div>Loading...</div>;
  }
  const { brand, image, origin, style, substyle, information } = product;
  return (
    <>
      <section>
        <h2>
          {brand}- {origin}
        </h2>
        <p>{style}</p>
        <p>{substyle}</p>
        <p>{information}</p>
        <Image src={image} width={200} height={350} alt={brand} />
        <h2>Packaging </h2>
        {skus.map((sku) => {
          return (
            <div key={sku.code} className={styles.productType}>
              <h3 className={styles.name}>{sku.name}</h3>
              <p className={styles.price}> ${formatCurrency(sku.price)}</p>
              <p className={styles.stock}>Stock:{sku.stock}</p>
            </div>
          );
        })}
        <Link href="/" className={styles.backHome}>
          Back to Home
        </Link>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();
  const paths = products.map((prod) => {
    const idBrand = createPath(prod.id, prod.brand);
    return { params: { idBrand } };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const {
    params: { idBrand },
  } = context;
  const prodId = await getId(idBrand);
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();

  const product = products.find((prod) => prod.id == prodId);

  const res2 = await fetch("http://localhost:3000/api/stock-price");
  const stockprice = await res2.json();

  const skus = product.skus.map((sku) => ({ ...stockprice[sku.code], ...sku }));
  return {
    props: {
      product,
      skus,
    },
    revalidate: 5,
  };
}
