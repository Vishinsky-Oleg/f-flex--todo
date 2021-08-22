export interface IUser {
    id: number;
    username: string;
    photoUrl: string;
    clicked({}): void;
}

// obj: {id: any, username: string}
export interface ITodo {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
    firebase: boolean;
    handleCheck(id: any, action?: string): void;
    firebaseName?: any;
    handleEdit(): void;
}

export interface IAddTodo {
    isOpened: boolean;
    toggleOpen(): void;
    addTodo(action: string, firebaseName?: string): void;
    error: boolean;
    textAreaRef: any;
    inputIsValid: boolean;
    text: string;
    firebaseName: string;
}
