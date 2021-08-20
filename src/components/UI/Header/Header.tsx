import { Link } from "react-router-dom";
import classes from "./Header.module.scss";
import HomeIcon from "@material-ui/icons/Home";
const Header = () => {
    return (
        <header className={classes.Header}>
            <div>
                <Link to="/">
                    <HomeIcon style={{ color: "#fff", paddingRight: "20px" }} />
                    TODO Application
                </Link>
            </div>
        </header>
    );
};

export default Header;
