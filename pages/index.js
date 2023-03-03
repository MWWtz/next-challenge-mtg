import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { createPath } from "@/lib/helpers";
import styles from "@/styles/ProductListingPage.module.css";

export default function ProductListingPage({ products }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.list}>
          {products.map((producto) => {
            const { brand, id, image, skus } = producto;
            return (
              <Link
                className={styles.link}
                key={id}
                href={createPath(id, brand)}
              >
                <div>
                  <h3>{brand}</h3>
                  <Image
                    src={image}
                    width={200}
                    height={300}
                    alt="producto"
                    priority
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();

  return {
    props: {
      products: data,
    },
  };
}
