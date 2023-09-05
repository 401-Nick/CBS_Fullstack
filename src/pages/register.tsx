import Layout from "../app/layout"
import RegisterModule from "../../components/RegisterModule"

//For some reason the form will leave a "scratch" or something in the bottom left corner. Animated padding caused it.


export default function Register() {
    return (
        <Layout>
            <RegisterModule />
        </Layout>
    );
}