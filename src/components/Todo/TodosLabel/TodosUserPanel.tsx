import { Avatar, Button, Typography } from "@material-ui/core";
import firebaseIcon from "../../../assets/touchicon.png";

const TodosUserPanel = ({
    username,
    id,
}: {
    username: string | null;
    id: number;
}) => {
    return (
        <div style={{ textAlign: "center" }}>
            <Typography variant="h3" color="textSecondary" component="h3">
                Username: <strong>{username}</strong>
            </Typography>
            <Typography variant="h3" color="textSecondary" component="h3">
                ID: <strong>{id}</strong>
            </Typography>
            <Button
                variant="contained"
                color="primary"
                style={{ margin: "20px" }}
                // className={classes.button}
                endIcon={<Avatar alt="Firebase" src={firebaseIcon} />}>
                Add new TODO to Firebase
            </Button>
        </div>
    );
};

export default TodosUserPanel;
