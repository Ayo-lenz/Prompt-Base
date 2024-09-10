'use client'

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {

	/* const isUserLoggedIn = true; 
		// the variable was used during during the nav design but instead we will use the 
		"useSession" provided by next auth to be able to get the current user data
	*/

	const {data: session} = useSession();
	const [providers, setProviders] = useState(null);
	
	// to make a dropdown for the mobile, we have this toggle use state
	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		// to set up the next-auth google provider 
		const setUpProviders = async () => {
			const response = await getProviders();

			setProviders(response);
		}

		setUpProviders();
	}, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'> 
			<Link href='/' className='flex gap-2 flex-center'>
				<Image 
					src='/assets/images/logo.svg'
					alt='Promptopia Logo'
					width={30}
					height={30}
					className='object-contain'
				></Image>
				<p className='logo_text'>Promptopia</p>
			</Link>		
			
			{/* desktop navigation */}
			<div className='sm:flex hidden'>
				{session?.user ? (
					<div className='flex gap-3 md:gap-5'>
						<Link href='/create-prompt' className='black_btn'>
							Create Post
						</Link>

						<button type='button' onClick={signOut} className='outline_btn'>
							Sign out
						</button>

						<Link href='/profile'>
							<Image 
								src={session?.user.image} 
								width={37} height={37} 
								className='rounded-full'
								alt='profile'></Image>
						</Link>
					</div>
				) : (
					/*
						the logic above shows what happens if the user is logged in so
						what happens if the user is not logged in;

						we are going to need an auth provider from the next-auth dependency that
						we installed earlier for user to be able to sign in
					*/
						<>
							{providers &&	
								Object.values(providers).map((provider) => {
									return(
										<button
										type='button'
										key={provider.name}
										onClick={ () => signIn(provider.id)}
										className='black_btn'
										>
										Sign In
									</button>
									)
									
								})
							}
						</>
				)}

			</div>

			{/* mobile navigation */}

			<div className="sm:hidden flex relative">
				{ session?.user ? (
					<div className="flex">
						<Image 
							src={session?.user.image} 
							width={37} 
							height={37} 
							className='rounded-full'
							alt='profile'
							onClick={ () => setToggleDropdown((prev) => !prev)}
						  /*it's not recommended when changing states in react to set
							the new state to the previous state for example:
							setToggleDropdown(!toggleDropdown) so it's advisable that we do it
							as above
							*/
							>
							
						</Image>
						{toggleDropdown && (
							<div className="dropdown">
								<Link 
									href='/profile'
									className='dropdown_link'
									onClick={() => setToggleDropdown(false)}
								>
									My Profile
								</Link>
								<Link 
									href='/create-prompt'
									className='dropdown_link'
									onClick={() => setToggleDropdown(false)}
								>
									create-prompt
								</Link>

								<button 
									type='button'
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
									className='mt-5 w-full black_btn'
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&	
							Object.values(providers).map((provider) => (
								<button
									type='button'
									key={provider.name}
									onClick={ () => signIn(provider.id)}
									className='black_btn'
									>
									Sign In
								</button>
							))
						}
					</>
				)}
			</div>
    </nav>
  )
}

export default Nav
