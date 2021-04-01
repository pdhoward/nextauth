import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>
          Welcome to <a href="https://proximitymachine.netlify.app/">PROXIMITY!</a>
        </h3>        

        <div className={styles.grid}>
          <a href="https://example.org" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about PROXIMITY features and API.</p>
          </a>

          <a href="https://example.org" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about PROXIMITY in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://example.org"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example PROXIMITY projects.</p>
          </a>

          <a
            href="https://example.org"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your PROXIMITY site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
