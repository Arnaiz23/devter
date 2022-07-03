import "../styles/globals.css"
import homeStyles from "styles/Home.module.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className={homeStyles.containerCenter}>
        <main className={`${homeStyles.main}`}>
          <Component {...pageProps} />
        </main>
      </div>
    </>
  )
}

export default MyApp
