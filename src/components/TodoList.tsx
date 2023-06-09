import { useState } from 'react'
import { SlArrowDown } from 'react-icons/sl'
import { useStoreActions } from '../lib/store';
import { getData, patchData } from '../lib/utils/httpRequests'
import { TODO_API, NESTED_TODO_API } from '@const/index'
import NestedTodos from "./NestedTodos"

export default function TodoList({ todos }: any) {
    return (
        <div className="pt-9">
            {todos.map((todo: any) => (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    description={todo.description}
                    completed={todo.completed}
                    endDate={todo.endDate}
                />
            ))}
        </div>
    )
}

// TODO ITEM COMPONENT

type TodoItemProps = {
    id: number,
    title: string,
    description: string,
    completed: boolean,
    endDate: string
}
const TodoItem = ({ id, title, description, completed, endDate }: TodoItemProps) => {

    const [isToggledTodo, setIsToggledTodo] = useState(false)
    const [nestedTodos, setNestedTodos] = useState<any>([])
    const { toggleTodo } = useStoreActions((actions) => actions.todo)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        patchData(`${TODO_API}/${id}`, { completed: !completed })
        toggleTodo(id)
    }
    const handleGetNestedTodos = async () => {
        if (!isToggledTodo) {
            const data = await getData(`${NESTED_TODO_API}?todoId=${id}`)
            setNestedTodos(data)
        }
        setIsToggledTodo(!isToggledTodo)
    }

    const checkDueDate = () => {
        const date = new Date(endDate);
        const today = new Date();
        return date > today;
    }

    return (
        <div className="flex flex-col py-5  border-b border-gray-800 relative">
            <div className="flex flex-row ">
                <div
                    onClick={handleGetNestedTodos}
                    className='absolute right-3 p-2 rounded-md hover:bg-slate-800 cursor-pointer'>
                    <SlArrowDown className={isToggledTodo ? "rotate-180 text-white" : "text-white"} />
                </div>
                <div className="mr-4">
                    <input checked={completed} onChange={handleChange} type="checkbox" className="w-7 h-7 text-green-600 bg-gray-100 border-gray-300 rounded-full focus:ring-green-500 " />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-gray-50 text-lg font-semibold">{title}</h3>
                    <p className="text-gray-300 w-[90%]">{description} </p>
                    <span className={`${checkDueDate() ? "text-green-400" : "text-red-700"} font-light mt-5`}>{endDate}</span>
                </div>
            </div>
            {isToggledTodo &&
                <div className='min-h-72 pb-24 relative'>
                    {nestedTodos && <NestedTodos todos={nestedTodos} todoId={id} setNestedTodos={setNestedTodos} />}
                </div>}
        </div>
    )
}


