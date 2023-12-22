import React,{useState} from 'react';
import Appbar from '@/app/components/Appbar';
import Drawer from '@/app/components/Drawer';
import { useSession } from 'next-auth/react';
import CompleteProfileForm from '@/app/components/CompleteProfileForm'
import 'tailwindcss/tailwind.css'

const CompleteProfile = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState();

    const handleMenuToggle  = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }

    const {data: session} = useSession();
    
    return(
        <main className='min-h-screen'>
        <Appbar onMenuToggle={handleMenuToggle}></Appbar>
        <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>


        {session? (
            <div>
                <h1>Formulario para completar o cadastro usando dados da sessão</h1>
                <CompleteProfileForm user={session.user}/>
            </div>

        ) : (
            <h1>Não logado</h1>

        )}


        </main>
    );
}
export default CompleteProfile;