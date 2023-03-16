import { lazy, Suspense } from 'react';
import { RouteObject, useRoutes, Navigate } from 'react-router-dom';



const SuspenseComponent = (Component: any) => (props: any) =>
(
    <Suspense fallback={<div>Loading...</div>}>
        <Component {...props} />
    </Suspense>
);


const MainPage = SuspenseComponent(lazy(() => import('@components/MainPage')));
const LoginPage = SuspenseComponent(lazy(() => import('@components/Login')));


export default function AppRoutes({ auth }: { auth: boolean }) {
    const routes: RouteObject[] = [
        {
            path: "/",
            element: auth ? <MainPage /> : <Navigate to="/login" />
        },
        {
            path: "/login",
            element: auth ? <Navigate to="/" /> : <LoginPage />
        }
    ]
    return useRoutes(routes);
}