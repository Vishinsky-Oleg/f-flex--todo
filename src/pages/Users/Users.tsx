import axios from "../../axios-jsonph";
import { useEffect } from "react";
import { useState } from "react";
import { IUser } from "../../interfaces";

const Users = (props: any) => {
    const [users, setUsers] = useState<IUser[]>([]);

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
        Promise.all([photos, users]).then((res) => {
            const mutatedUsers = [...res[1]].map((user: any) => {
                return {
                    ...user,
                    photoUrl: res[0][user.id],
                };
            });
            setUsers(mutatedUsers);
        });
    }, []);

    return (
        <div>
            <p>Users</p>
        </div>
    );
};

export default Users;
