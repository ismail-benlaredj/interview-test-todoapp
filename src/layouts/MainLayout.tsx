import { ReactNode } from "react"

type Props = {
    children?: ReactNode;
}
export default function MainLayout({ children }: Props) {
    return (
        <div className='bg-slate-900 h-fit text-center '>
            <h1 className="font-bold text-4xl py-3 text-white ">Your Todo</h1>

            <div className=" max-w-5xl mx-auto p-10  h-fit relative text-left">
                {children}
            </div>
        </div>
    )
}
