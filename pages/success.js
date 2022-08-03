import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';
import { runFireworks } from '../lib/utils';

const Success = () => {
	const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear()
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantities(0)
    runFireworks()
  }, [])

	return (
		<div className='success-wrapper'>
			<div className='success'>
				<p className='icon'>
					<BsBagCheckFill />
				</p>
				<h2>Merci pour votre commande !</h2>
				<p className='email-msg'>Un email vient de vous être envoyé.</p>
				<p className='description'>
					Si vous avez des questions concernant votre commande, contactez nous
					par email
					<a href='mailto:order@example.com' className='email'>
						order@example.com
					</a>
				</p>
				<Link href='/'>
					<div className='btn-wrapper'>
						<button type='button' width='300px' className='btn'>
							Continuez votre visite
						</button>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Success;
