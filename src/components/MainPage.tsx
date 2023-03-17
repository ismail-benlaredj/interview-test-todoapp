import { useEffect, useState } from "react";
import MainLayout from "@layouts/MainLayout"
import AddTodoForm from "./AddTodoForm"
import AddButton from "./AddButton";
import useFetchData from "@hooks/useFetchData";
import { useStoreState, useStoreActions } from '../lib/store';
import { TODO_API } from "@const/index"
import TodoList from "./TodoList";

export default function MainPage() {
    const [showForm, setShowForm] = useState(false)
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
            {!showForm && <div className="absolute top-3 right-3 ">
                <AddButton btn="Add a todo" setShowForm={setShowForm} showForm={showForm} />
            </div>}

            {showForm && <AddTodoForm setShowForm={setShowForm} />}
            {todos && <TodoList todos={todos} />}
        </MainLayout>
    )
}
