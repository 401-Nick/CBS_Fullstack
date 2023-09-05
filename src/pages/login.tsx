import LoginModule from "../../components/LoginModule"
import Layout from "../app/layout"

//For some reason the form will leave a "scratch" or something in the bottom left corner after interacting. Animated padding caused it.

export default function Home() {
    return (
        <Layout>
                <LoginModule />
        </Layout>
    )
}
