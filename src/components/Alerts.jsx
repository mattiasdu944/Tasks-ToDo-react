import React from 'react'

const Alerts = ({children}) => {
  return (
    <div className="py-3 px-6 bg-indigo-500 text-white text-md font-bold'">
        {children}
    </div>
  )
}

export default Alerts