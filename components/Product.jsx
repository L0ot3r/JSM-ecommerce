import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const Product = ({ product: { name, image, slug, price } }) => {
	return (
		<div className='product-card-container'>
			<Link href={`/product/${slug.current}`}>
				<div className='product-card'>
					<img
						src={urlFor(image && image[0])}
						alt={name}
						width={250}
						height={250}
						className='product-image'
					/>
					<div className='product-card-desc'>
						<p className='product-name'>{name}</p>
						<p className='product-price'>€{price}</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default Product;
