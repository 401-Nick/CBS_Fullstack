import LoginModule from "../../components/LoginModule"
import Layout from "../app/layout"


export default function Home() {
    return (
        <Layout>
            <main className="main">
            <LoginModule />
            </main>
        </Layout>
    )
}
