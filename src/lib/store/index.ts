import { createStore, action, Action } from 'easy-peasy';

interface User {
    id: number;
    email: string;
    auth: boolean;
}

interface UserModel {
    user: User | null;
    setUser: Action<UserModel, User>;
    logout: Action<UserModel>;
}
const userModel: UserModel = {
    user: null,
    setUser: action((state, payload) => {
        state.user = payload;
    }),
    logout: action((state) => {
        state.user = null;
    }),
}

interface Todo {
    id: number;
    name: string;
    description: string;
    completed: boolean;
}

interface TodoModel {
    todos: Todo[];
    addTodo: Action<TodoModel, Todo>;
    deleteTodo: Action<TodoModel, number>;
    toggleTodo: Action<TodoModel, number>;

}

const todoModel: TodoModel = {
    todos: [],
    addTodo: action((state, payload) => {
        state.todos.push(payload);
    }),
    deleteTodo: action((state, payload) => {
        state.todos = state.todos.filter((todo) => todo.id !== payload);
    }),
    toggleTodo: action((state, payload) => {
        state.todos = state.todos.map((todo) =>
            todo.id === payload ? { ...todo, completed: !todo.completed } : todo
        );
    }),
};

const store = createStore({
    todo: todoModel,
    user: userModel,
});

export default store;