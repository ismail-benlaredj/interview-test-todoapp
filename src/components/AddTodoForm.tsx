import { useState } from "react"
import { postData } from "lib/utils/httpRequests"
import { TODO_API, NESTED_TODO_API } from "@const/index"
import { useStoreState, useStoreActions } from '../lib/store';

const style = "appearance-none bg-transparent border-none w-full text-white  py-1 px-2 leading-tight focus:outline-none"
type AddTodoFormProps = {
    setShowForm: (value: React.SetStateAction<boolean>) => void;
    addForNested?: boolean;
    idNested?: number;
    setNestedTodos?: (value: React.SetStateAction<any>) => void;
    todos?: any;
}

export default function AddTodoForm({
    setShowForm,
    addForNested = false,
    idNested,
    setNestedTodos,
    todos

}: AddTodoFormProps) {
    const [todo, setTodo] = useState("")
    const [description, setdescription] = useState("")
    const [endDate, setendDate] = useState("")

    const { user } = useStoreState((state) => state.user)
    const { addTodo } = useStoreActions((actions) => actions.todo)



    const handleAddTodo = async () => {
        const todoData = {
            userId: user.id,
            title: todo,
            description: description,
            endDate: endDate,
            completed: false,
            pos: 1
        }
        const { data } = await postData(TODO_API, todoData)
        addTodo(data)
    }

    const handleAddNestedTodo = async () => {
        const todoData = {
            todoId: idNested,
            userId: user.id,
            title: todo,
            description: description,
            endDate: endDate,
            completed: false,
            pos: 1
        }
        const { data } = await postData(NESTED_TODO_API, todoData)
        let tab = [...todos]
        tab.push(data)
        console.log(tab)
        setNestedTodos(tab)
    }

    return (
        <div className="p-4 border-2 border-gray-700 rounded-lg sticky">
            <form className="w-full">
                <div className="flex flex-col  py-2">
                    <div className="border-b border-gray-700 mb-4">
                        <input onChange={(e) => { setTodo(e.target.value) }}
                            className={style} type="text" placeholder="New todo..." aria-label="todo name" />
                    </div>
                    <div className="border-b border-gray-700 mb-4">
                        <input
                            onChange={(e) => { setdescription(e.target.value) }}
                            className={style} type="text" placeholder="Description" aria-label="todo Description" />
                    </div>
                    <div className=" mb-4 w-[200px]">
                        <input onChange={(e) => { setendDate(e.target.value) }}
                            className={style} type="date" aria-label="todo due" />
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={addForNested ? handleAddNestedTodo : handleAddTodo}
                            className={`${todo === "" ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 cursor-pointer hover:bg-blue-600"} flex-shrink-0   focus:outline-none focus:bg-blue-600 text-sm  text-white px-4 py-2 rounded`}
                            type="button"
                            disabled={todo === "" ? true : false}

                        >
                            add todo
                        </button>
                        <button onClick={() => setShowForm(false)}
                            className="flex-shrink-0 border-transparent border-4 text-blue-400 hover:text-blue-100 text-sm py-1 px-2 rounded" type="button">
                            Cancel
                        </button>
                    </div>
                </div>
            </form >
        </div >
    )
}
