import Head from "next/head";
import Rekommendera from "rekommendera/components/Rekommendera";

export default function Home() {
  return (
    <>
      <Head>
        <title>Rekommendera</title>
        <meta name="description" content="Rekommenderar vad du än vill ha rekommenderat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-slate-100">
        <h1 className="mt-6 mb-10 text-3xl">Rekommendera</h1>
        <Rekommendera />
      </main>
    </>
  );
}
