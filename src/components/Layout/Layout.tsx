import { Container } from "@material-ui/core";
import Header from "../UI/Header/Header";

const Layout = (props: any): JSX.Element => {
    return (
        <>
            <Header />
            <Container
                maxWidth="lg"
                style={{
                    display: "flex",
                    justifyContent: 'center',
                    flexDirection: "row",
                    flexWrap: "wrap",
                }}>
                {props.children}
            </Container>
        </>
    );
};

export default Layout;
