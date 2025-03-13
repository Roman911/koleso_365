'use client'
import Image from 'next/image';
import { FC } from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/dropdown';
import { Button } from '@heroui/button';
import * as Icons from '@/components/UI/Icons';
import { SettingsProps } from '@/models/settings';

interface Props {
	settings: SettingsProps
}

const Contacts: FC<Props> = ({ settings }) => {
	const telephones: { phone: string; url: string; logo: "vodafone" | "kievstar" | "life" | undefined }[] = [
		{ phone: settings.ua.config_telephone_vodafone, url: settings.ua.config_telephone_vodafone_url, logo: 'vodafone' },
		{ phone: settings.ua.config_telephone_kievstar, url: settings.ua.config_telephone_kievstar_url, logo: 'kievstar' },
		{ phone: settings.ua.config_telephone_life, url: settings.ua.config_telephone_life_url, logo: 'life' },
	];

	const filterTelephones = telephones.filter(i => i.phone);

	return (
		<Dropdown>
			<DropdownTrigger className='md:hidden'>
				<Button variant='light' className='p-0 min-w-12 gap-1'>
					<div className='pt-2 pb-1 pl-2 pr-1 bg-primary rounded-full'>
						<Icons.PhoneIcon className='h-6 w-6 fill-white' />
					</div>
					<Icons.ChevronDownIcon className='h-2 w-2 stroke-black' />
				</Button>
			</DropdownTrigger>
			<DropdownMenu aria-label="Dynamic Actions" items={filterTelephones}>
				{(item) => (
					<DropdownItem
						key={ item.phone }
						startContent={ item.logo ? <Image width={ 24 } height={ 24 } src={`/icons/${item.logo}-logo.svg`} alt=''/> :
							<Icons.PhoneIcon className='fill-primary' /> }
					>
						<a href={`tel:${item.url}`} className='ml-2.5 font-medium'>
							{item.phone}
						</a>
					</DropdownItem>
				)}
			</DropdownMenu>
		</Dropdown>
	)
};

export default Contacts;
