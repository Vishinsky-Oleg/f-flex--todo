import { Container } from "@material-ui/core";
import Header from "../UI/Header/Header";

const Layout = (props: any):JSX.Element => {
    return (
        <>
            <Header />
            <Container maxWidth="lg">{props.children}</Container>
        </>
    );
};

export default Layout;
