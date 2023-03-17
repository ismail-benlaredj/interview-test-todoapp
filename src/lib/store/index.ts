import {
    createStore,
    action,
    Action,
    createTypedHooks
} from 'easy-peasy';

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
    userId?: number;
    id: number;
    pos: number;
    title: string;
    description: string;
    completed: boolean;
    endDate: string;
    nestedTodos?: Todo[];
}

interface TodoModel {
    todos: Todo[];
    setTodos: Action<TodoModel, Todo[]>;
    addTodo: Action<TodoModel, Todo>;
    deleteTodo: Action<TodoModel, number>;
    toggleTodo: Action<TodoModel, number>;
    addNestedTodo: Action<TodoModel, any>;
    toggleNestedTodo: Action<TodoModel, any>;

}

const todoModel: TodoModel = {
    todos: [],
    setTodos: action((state, payload) => {
        state.todos = payload;
    }),
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

    addNestedTodo: action((state, payload) => {
        for (let i = 0; i < state.todos.length; i++) {
            if (state.todos[i].id === payload.id) {
                console.log(state.todos[i])
                state.todos[i].nestedTodos.push(payload.data)
                break;
            }
        }
    }),
    toggleNestedTodo: action((state, payload) => {
        state.todos[payload.id] = payload.data
    }),
};

interface StoreModel {
    todo: TodoModel;
    user: UserModel;
}
const store = createStore({
    todo: todoModel,
    user: userModel,
});

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export default store;