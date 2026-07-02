// import React from 'react'
// import { useSelector } from 'react-redux';
// import {Navigate,Outlet} from "react-router-dom";

// const ProtectedRoute = ({allowedRoles}) => {
//   const {user,isAuthenticated} = useSelector(
//     (state)=> state.auth
//   );

//   if(user === null) return <Navigate to="/login"/>

//   if(allowedRoles && !allowedRoles.includes(user.role)){
//     return <Navigate to="/unauthorized"/>
//   }

//   return <Outlet/>
// }

// export default ProtectedRoute

import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated, isAuthLoading } = useSelector(
    (state) => state.auth
  );

  if (isAuthLoading) return <div>Loading...</div>;

  if (!isAuthenticated || !user) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;