import { axiosJsonph as axios } from "../../axios-instances";
import { useEffect } from "react";
import { useState } from "react";
import { IUser } from "../../interfaces";
import User from "../../components/User/User";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Error from "../../components/Error/Error";

const Users = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const history = useHistory();
    useEffect(() => {
        //Promise to get users
        const users = axios.get("/users").then((users) => {
            const changedUsers = users.data.map(
                (user: { username: string; id: number }) => {
                    return {
                        id: user.id,
                        username: user.username,
                    };
                }
            );

            return changedUsers;
        });
        //Promise to get photos
        const photos = axios.get("/photos").then((photos) => {
            const photoUrl = photos.data.map((photo: any) => photo.url);
            return photoUrl;
        });

        //Mutate them together
        Promise.all([photos, users])
            .then((res) => {
                const mutatedUsers = [...res[1]].map((user: any) => {
                    return {
                        ...user,
                        photoUrl: res[0][user.id],
                    };
                });
                setUsers(mutatedUsers);
                setLoading(false);
            })
            .catch((er) => {
                setLoading(false);
                setError(er.message);
            });
    }, []);

    const handleClick = (obj: {id: any, username: string}) => {
        const historyObj = {
            pathname: "/" + obj.id,
            search: "?username=" + obj.username,
        };
        history.push(historyObj);
    };

    const renderUsers = users.map((user) => {
        return (
            <User
                photoUrl={user.photoUrl}
                id={user.id}
                username={user.username}
                key={user.id}
                clicked={handleClick.bind( null, {id: user.id, username: user.username})}
            />
        );
    });

    return (
        <>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Error message={error} />
            ) : (
                renderUsers
            )}
        </>
    );
};

export default Users;
