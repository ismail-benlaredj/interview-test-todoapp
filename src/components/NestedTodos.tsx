
import { patchData } from "../lib/utils/httpRequests"
import { NESTED_TODO_API } from "@const/index"
import AddButton from "./AddButton"
import { useState } from "react"

// NESTED TODO LIST COMPONENT
const NestedTodos = ({ todos }: any) => {
    console.log(todos)

    return (
        <>

            <div className="relative mt-8">
                {todos.map((todo: any) => (
                    <NestedTodoItem
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        description={todo.description}
                        completed={todo.completed}
                        endDate={todo.endDate}
                    />
                ))}
            </div>
            <AddButton btn="Add nested todo" />
        </>

    )
}

export default NestedTodos

type TodoItemProps = {
    id: number,
    title: string,
    description: string,
    completed: boolean,
    endDate: string
}


const NestedTodoItem = ({ id, title, description, completed, endDate }: TodoItemProps) => {
    const [iscompleted, setIscompleted] = useState<boolean>(completed)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIscompleted(!iscompleted)
        patchData(`${NESTED_TODO_API}/${id}`, { completed: !completed })

    }
    return (
        <div className="flex flex-row border-b border-gray-800 ml-5 w-[80%]
        p-5">

            <div className="mr-4">
                <input checked={iscompleted} onChange={handleChange} type="checkbox" className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded-full focus:ring-green-500 " />
            </div>
            <div className="flex flex-col">
                <h3 className="text-gray-50 text-md font-semibold">{title}</h3>
                <p className="text-gray-300 ">{description} </p>
            </div>
        </div>
    )
}