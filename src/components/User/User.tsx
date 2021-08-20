import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    root: {
        minWidth: 250,
        display: "inline-block",
        margin: 15,
    },
    media: {
        height: 140,
    },
});

type UserListProps = {
    photoUrl: string;
    username: string;
    id: number;
    clicked(id: any): void;
};

const User = ({ photoUrl, id, username, clicked }: UserListProps) => {
    const classes = useStyles();
    return (
        <Card className={classes.root} onClick={clicked}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={photoUrl}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <div>
                        <Typography gutterBottom variant="h5" component="p">
                            <strong>ID: </strong>
                            {id}
                        </Typography>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="p"
                            style={{ fontSize: 20 }}>
                            <strong>Username: </strong>
                            {username}
                        </Typography>
                    </div>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default User;
