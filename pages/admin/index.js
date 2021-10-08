// arveselovski.com/admin
import Head from "next/head";

export default function Admin() {
  return (
    <>
      <Head>
        <title>Admin | AV.</title>
      </Head>

      <div className="max-w-3xl">Admin page</div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req, res } = context;

  return {
    props: {},
  };
}
