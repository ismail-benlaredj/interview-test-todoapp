import { IoMdAdd } from "react-icons/io"


type AddButtonProps = {
    btn: string;
}

export default function AddButton({ btn }: AddButtonProps) {
    return (
        <div className="absolute flex justify-center bottom-2 right-2 cursor-pointer hover:bg-slate-800 rounded-md">
            <div className="flex flex-row items-center px-4 py-2 ">
                <IoMdAdd className="text-white w-6 h-6" />
                <span className="text-white text-base ml-2 font-semibold">{btn}</span>
            </div>
        </div>
    )
}

