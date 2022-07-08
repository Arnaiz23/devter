import Devit from "components/Devit"
import Search from "components/Icons/Search"
import Home from "components/Icons/Home"
import Create from "components/Icons/Create"
import Head from "next/head"
import Link from "next/link"
import styles from "../home/style.module.css"

export default function DevitPage(props) {
  return (
    <>
      <Head>
        <title>Devit / Devter</title>
      </Head>
      <Devit devit={props} />
      <nav className={styles.nav}>
        <Link href="/home">
          <a>
            <Home width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/search">
          <a>
            <Search width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Create width={32} height={32} stroke="#09f" />
          </a>
        </Link>
      </nav>
    </>
  )
}

// ! Generar todas las paginas una vez hagas el build. Si hay 20 tweets, creara 20 paginas estaticas
/* export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "tbKXhyePbTZqgsjhKlEz" } }],
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params

  return firestore
    .collection("devits")
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
} */

// !Mejor forma para esta aplicacion
export async function getServerSideProps(context) {
  const { params, res } = context
  const { id } = params

  const apiResponse = await fetch(`${process.env.API_URL}/devits/${id}`)
  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props }
  }
  if (res) {
    res.writeHead(301, { Location: "/home" }).end()
  }
}

// ! Forma antigua
/* DevitPage.getInitialProps = (context) => {
  const { query, res } = context
  const { id } = query

  return fetch(`http://localhost:3000/api/devits/${id}`).then((apiResponse) => {
    if (apiResponse.ok) return apiResponse.json()
    if (res) {
      res.writeHead(301, { Location: "/home" }).end()
    }
  })
} */
