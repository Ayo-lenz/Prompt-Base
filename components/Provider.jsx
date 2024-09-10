'use client';

import { SessionProvider } from 'next-auth/react'

/* 
Remember we initialized the provider function from next-auth in the nav component
to enable our login therefore this component will be used to set up the user 
sign-in authentication provider by next-auth and to make the authentication work in order
to authenticate users in and the be able to show their profile photo
*/

const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider