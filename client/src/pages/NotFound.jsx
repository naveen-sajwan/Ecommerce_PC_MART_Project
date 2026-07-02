import React from 'react'
import notFound from "../assets/images/notFound.png";

const NotFound = () => {
  return (
    <>
        <div className="min_height container d-flex text-center justify-content-center align-items-center flex-column p-4">
            <div>
                <img src={notFound} width="400" alt="no_entry" />
            </div>
            <h1><strong>404</strong>Page Not Found</h1>
        </div>
    </>
  )
}

export default NotFound