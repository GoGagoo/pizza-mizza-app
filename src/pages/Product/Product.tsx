import { Suspense } from 'react'
import { Await, Link, useLoaderData } from 'react-router-dom'

import Headling from '../../components/Headling/Headling'
import { Product } from '../../interfaces/product.interface'

import Button from '../../components/Button/Button'
import styles from './Product.module.css'

export function Product() {
	const data = useLoaderData() as { data: Product }
	

	return (
		<>
			<Suspense fallback={'Загружаю...'}>
				<Headling>
					<Await resolve={data.data}>
						{({ data }: { data: Product }) => (
							<>
								<Link className={styles['exit-icon']} to='/'>
									<button className={styles['exit-btn']}>
										<img src='/right-arrow-icon.svg' />
									</button>
								</Link>
								{data.name}
								<Button appearance='small' className={styles['add-to-cart']}>
									<img src='/cart-button-icon.svg' />
									В корзину
								</Button>
							</>
						)}
					</Await>
				</Headling>
				<Await resolve={data.data}>
					{({ data }: { data: Product }) => (
						<div className={styles['product-item']}>
							<div
								className={styles['image']}
								style={{ backgroundImage: `url('${data.image}')` }}
							></div>
							<>
								<div className={styles['info']}>
									<div className={styles['price']}>
										<div className=''>
											<p className={styles['currency-text']}>
												Цена {data.price}&nbsp;
												<span className={styles['currency']}>₽</span>
											</p>
										</div>
									</div>
									<p className={styles['rating']}>
										Рейтинг
										<div className={styles['']}>{data.rating}</div>
									</p>
									<div className={styles['ingredients']}>
										<div className={styles['ingredient-head']}>Состав:</div> 
										<ul>
											{data.ingredients.map((ingredient, index) => (
												<li key={index}>{ingredient}</li>
											))}
										</ul>
									</div>
								</div>
							</>
						</div>
					)}
				</Await>
			</Suspense>
		</>
	)
}

export default Product