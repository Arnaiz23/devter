import Link from "next/link"

export default function Timeline({ userName }) {
    return (
        <>
            <h1>This is the timeline of {userName}</h1>
            <Link href="/">
                <a>Go to home</a>
            </Link>
        </>
    )
}

// * Para hacer fetch y pasarle las props
// * Lo ejecuta antes de renderizar la pagina (solo funciona en páginas)
Timeline.getInitialProps = async () => {
    return fetch("http://localhost:3000/api/hello")
            .then(res => res.json())
}