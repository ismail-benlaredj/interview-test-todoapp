import { useState } from 'react'
import { SlArrowDown } from 'react-icons/sl'

export default function TodoList({ todos }: any) {
    return (
        todos.map((todo: any) => {
            return (
                <TodoItem
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    description={todo.description}
                    completed={todo.completed}
                    endDate={todo.endDate}
                />
            )
        })

    )
}


type TodoItemProps = {
    id: number,
    title: string,
    description: string,
    completed: boolean,
    endDate: string
}
const TodoItem = ({ title, description, completed, endDate }: TodoItemProps) => {
    const [iscompleted, setIscompleted] = useState<boolean>(completed)
    const [isToggledTodo, setIsToggledTodo] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIscompleted(!iscompleted)
    }
    return (
        <div className="flex py-5 flex-row border-b border-gray-800 relative">
            <div
                onClick={() => setIsToggledTodo(!isToggledTodo)}
                className='absolute right-3 p-2 rounded-md hover:bg-slate-800 cursor-pointer'>
                <SlArrowDown className={isToggledTodo ? "rotate-180 text-white" : "text-white"} />
            </div>
            <div className="mr-4">
                <input checked={iscompleted} onChange={handleChange} type="checkbox" className="w-7 h-7 text-green-600 bg-gray-100 border-gray-300 rounded-full focus:ring-green-500 " />
            </div>
            <div className="flex flex-col">
                <h3 className="text-gray-50 text-lg font-semibold">{title}</h3>
                <p className="text-gray-300 ml-">{description} </p>
            </div>

            {isToggledTodo && <div className='h-72'></div>}
        </div>
    )
}