import { Typography } from "@material-ui/core";

type ErrorProps = {
    message: string;
};

const Error = ({ message }: ErrorProps) => {
    return (
        <div>
            <Typography gutterBottom variant="h3" component="h1" color="error">
                Oops! Something went wrong!
            </Typography>
            <Typography gutterBottom variant="h5" component="p" color="error">
                {message}
            </Typography>
        </div>
    );
};

export default Error;
