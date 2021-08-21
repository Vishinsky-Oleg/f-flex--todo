
export interface IUser {
    id: number;
    username: string;
    photoUrl: string;
    clicked({}): void;
}

export interface ITodo {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}
