import MainLayout from "@layouts/MainLayout"
import AddTodoForm from "./AddTodoForm"
import useFetchData from "@hooks/useFetchData";
import { useStoreState } from '../lib/store';
import { TODO_API } from "@const/index"
import TodoList from "./TodoList";

export default function MainPage() {
    const { user } = useStoreState((state) => state.user)
    //fetch todos
    const [data, isLoading, error] = useFetchData(`${TODO_API}?userId=${user?.id}`);


    return (
        <MainLayout>
            <AddTodoForm />
            {data && <TodoList todos={data} />}
        </MainLayout>
    )
}
