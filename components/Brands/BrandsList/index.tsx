import { FC, Fragment } from 'react';
import { Link } from '@/i18n/routing';
import { Brand, BrandsObject, BrandsObjectItems } from '@/models/brends';
import { Section } from '@/models/filter';

interface Props {
	section: string
	brands: BrandsObject | BrandsObjectItems
}

const BrandsList: FC<Props> = ({ brands, section }) => {
	return Object.entries(brands).map(([letter, brands], index) => {
		return <Fragment key={ index }>
			<div className='text-lg font-bold mb-1'>{ letter }</div>
			{ brands.map((brand: Brand, i: number) => {
				if(section === Section.Car) {
					return <Link
						key={ i }
						// onClick={ () => handleClick(brand.id) }
						className='block text-base hover:text-primary hover:underline'
						href={ `/catalog/tires` }
					>
						{ brand.name }
					</Link>
				}

				return <Link
					key={ i }
					className='block text-base hover:text-primary hover:underline'
					href={ `/catalog-map/${section}/${brand.manufacturer_id}` }
				>
					{ brand.name }
				</Link>
			}) }
		</Fragment>
	})
};

export default BrandsList;