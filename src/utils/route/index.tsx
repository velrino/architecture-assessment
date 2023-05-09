import { Navigate, Outlet, Route, useNavigate } from "react-router-dom";


export const ProtectedRoutes = (props: any) => {
    const authenticated: boolean = true;

    if (props.roleRequired) {
        return authenticated ? <Outlet /> : (<Navigate to="/denied" />)
    } else {
        return authenticated ? <Outlet /> : <Navigate to="/auth/login" />
    }
}

export const PublicRoutes = (props: any) => {
    console.log({props })
    return false ? <Navigate to="/home" /> : <Outlet />
}
