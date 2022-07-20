import React, { useState } from 'react';
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiFillStar,
	AiOutlineStar,
} from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ products, product }) => {
	const { image, name, details, price } = product;
	const [index, setIndex] = useState(0);
	const { decQty, incQty, qty, setQty, onAdd, setShowCart } = useStateContext();

	return (
		<div>
			<div className='product-detail-container'>
				<div>
					<div className='image-container'>
						<img
							src={urlFor(image && image[index])}
							alt=''
							className='product-detail-image'
						/>
					</div>
					<div className='small-images-container'>
						{image?.map((item, i) => (
							<img
								key={name + i}
								src={urlFor(item)}
								alt={name + i}
								className={
									i === index ? 'small-image selected-image' : 'small-image'
								}
								onMouseEnter={() => setIndex(i)}
							/>
						))}
					</div>
				</div>
				<div className='product-detail-desc'>
					<h1>{name}</h1>
					<div className='reviews'>
						<div>
							{[0, 1, 2, 3].map((i) => (
								<AiFillStar key={i} />
							))}
							<AiOutlineStar />
						</div>
						<p>(20)</p>
					</div>
					<h4>Details: </h4>
					<p> {details} </p>
					<p className='price'> €{price} </p>
					<div className='quantity'>
						<h3>Quantité:</h3>
						<p className='quantity-desc' style={{ marginTop: 0 }}>
							<span className='minus' onClick={decQty}>
								<AiOutlineMinus />
							</span>
							<span className='num' onClick={() => {}}>
								{qty}
							</span>
							<span className='plus' onClick={incQty}>
								<AiOutlinePlus />
							</span>
						</p>
					</div>
					<div className='buttons'>
						<button
							type='button'
							className='add-to-cart'
							onClick={() => {
								onAdd(product, qty);
								setQty(1);
								setShowCart(true)
							}}
						>
							Ajouter au panier
						</button>
						<button type='button' className='buy-now' onClick={() => {}}>
							Acheter maintenant
						</button>
					</div>
				</div>
			</div>
			<div className='maylike-products-wrapper'>
				<h2>Vous aimerez peut-être</h2>
				<div className='marquee'>
					<div className='maylike-products-container track'>
						{products.map((item) => (
							<Product key={item._id} product={item} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export const getStaticPaths = async () => {
	const query = `*[_type == "product"] {
		slug {
			current
		}
	}`;
	const products = await client.fetch(query);

	const paths = products.map((product) => ({
		params: {
			slug: product.slug.current,
		},
	}));

	return {
		paths,
		fallback: 'blocking',
	};
};

export const getStaticProps = async ({ params: { slug } }) => {
	const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
	const productQuery = '*[_type == "product"]';

	const product = await client.fetch(query);
	const products = await client.fetch(productQuery);

	return {
		props: { products, product },
	};
};

export default ProductDetails;
