"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const path = usePathname();

    return (
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
            <Link href={'/'}>
                <Image src={'/logo1.png'} width={50} height={50} alt="logo" className='cursor-pointer'/>
            </Link>

            <ul className='hidden md:flex gap-6'>
                <Link href={"/"}>
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                        ${path == '/' && 'text-primary font-bold'}
                        `}
                    >Home</li>
                </Link>
                
                <Link href={"/dashboard"}>
                   <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                        ${path == '/dashboard' && 'text-primary font-bold'}
                        `}
                    >Dashboard</li>
                </Link>
                
                <Link href={"/dashboard/upgrade"}>
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                        ${path == '/dashboard/upgrade' && 'text-primary font-bold'}
                        `}
                    >Upgrade</li>
                </Link>
                
                <Link href={"/dashboard/howitworks"}>
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                        ${path == '/dashboard/howitworks' && 'text-primary font-bold'}
                        `}
                    >How it works</li>
                </Link>
            </ul>

            <UserButton />
        </div>
    )
}

export default Header