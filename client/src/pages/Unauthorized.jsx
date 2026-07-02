import React from 'react'
import no_entry from "../assets/images/no-entry.png";

const Unauthorized = () => {
  return (
    <>
        <div className="min_height container justify-content-center align-items-center d-flex flex-column text-center  p-4">
            <div>
                <img src={no_entry} width="400" alt="no_entry" />
            </div>
            <h1><strong>401</strong> Unauthorized access</h1>
        </div>
    </>
  )
}

export default Unauthorized;