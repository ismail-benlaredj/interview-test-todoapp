import { ReactNode } from "react"

type Props = {
    children?: ReactNode;
}
export default function MainLayout({ children }: Props) {
    return (
        <div className='bg-slate-900 h-screen '>
            <div className=" max-w-5xl brd mx-auto p-10 h-screen">
                {children}
            </div>
        </div>
    )
}
