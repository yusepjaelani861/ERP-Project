import React from 'react'

const HomePage = () => {
  return (
    <>
    <div>HomePage</div>
    {process.env.NEXT_PUBLIC_API_URL}
    </>
  )
}

export default HomePage