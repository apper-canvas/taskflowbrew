import React from 'react'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Home />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="z-[9999]"
        toastClassName="bg-white shadow-lg border border-gray-200"
        progressClassName="bg-primary"
      />
    </>
  )
}

export default App