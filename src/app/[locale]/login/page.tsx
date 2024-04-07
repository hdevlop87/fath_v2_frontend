import React from 'react'
import Image from 'next/image';
import intro from '@/assets/intro.png';
import LoginForm from '@/components/Forms/LoginForm';
import logo from '@/assets/logo.png';

const Login = async  () => {
    return (
        <div className='flex w-full h-full justify-center items-center'>
            <div className="flex w-0 lg:w-3/5 xl:w-4/6 justify-center items-center" >
                <Image src={intro} width={600} height={600} alt='intro' />
            </div>
            <div className=" flex-1 justify-center flex flex-col items-center gap-16 w-full" >
                <Image src={logo} width={140} alt='logo' className='' />
                <div className='flex flex-col gap-8 items-center justify-center w-full pl-14 pr-14'>
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}

export default Login