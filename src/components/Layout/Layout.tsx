import { Container, makeStyles } from "@material-ui/core";
import Header from "../UI/Header/Header";

const useStyles = makeStyles({
    layout: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
    },
});

const Layout = (props: any): JSX.Element => {
    const classes = useStyles();

    return (
        <>
            <Header />
            <Container maxWidth="lg" className={classes.layout}>
                {props.children}
            </Container>
        </>
    );
};

export default Layout;
