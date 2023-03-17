import MainLayout from "@layouts/MainLayout"
import AddTodoForm from "./AddTodoForm"
import useFetchData from "@hooks/useFetchData";
import { useStoreState, useStoreActions } from '../lib/store';
import { TODO_API } from "@const/index"
import TodoList from "./TodoList";
import { useEffect } from "react";

export default function MainPage() {
    const { user } = useStoreState((state) => state.user)
    const { todos } = useStoreState((state) => state.todo)
    const { setTodos } = useStoreActions((actions) => actions.todo)

    //fetch todos
    const [data, isLoading, error] = useFetchData(`${TODO_API}?userId=${user?.id}`);

    useEffect(() => {
        data && setTodos(data)
    }, [data])
    return (
        <MainLayout>
            <AddTodoForm />
            {todos && <TodoList todos={todos} />}
        </MainLayout>
    )
}
