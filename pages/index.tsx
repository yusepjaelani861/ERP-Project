import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'

const HomePage = () => {
  return (
    <>
    <div>HomePage</div>
    {process.env.NEXT_PUBLIC_API_URL}
    </>
  )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return {
    redirect: {
      destination: '/auth/login',
    }
  }
}

export default HomePage