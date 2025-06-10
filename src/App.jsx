import React from 'react'
import { ToastContainer } from 'react-toastify'
import HomePage from '@/components/pages/HomePage';

function App() {
  return (
    <>
<HomePage />
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