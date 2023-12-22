'use client'
import Appbar from '@/app/components/Appbar';
import Drawer from '@/app/components/Drawer';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, {useState} from 'react';
import 'tailwindcss/tailwind.css'

const LoginPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState();

  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const { data: session } = useSession();
  const router = useRouter();

  console.log(session);


  if (session) {
    return (
      <main className="min-h-screen">
        <Appbar onMenuToggle={handleMenuToggle}></Appbar>
        <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
        
            <h2>
              {" "}
              Logado como: {session.user.name}, e-mail: {session.user.email} <br />
            </h2>

          
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                onClick={() => router.push("/profile/complete-profile")}
              >
                Complete your profile
              </button>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                onClick={() => {
                  signOut();
                }}
              >
                Sign out
              </button>
      </main>
    );
  }
  return (
    <main className="min-h-screen">
      <Appbar onMenuToggle={handleMenuToggle}></Appbar>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
      <h2> You are not signed in!!</h2>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
                onClick={() => signIn()}>
          Sign in
        </button>
    </main>
  );






}
export default LoginPage;