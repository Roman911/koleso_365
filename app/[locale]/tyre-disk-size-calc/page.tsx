import LayoutWrapper from '@/components/Layout/LayoutWrapper';
import Breadcrumbs from '@/components/UI/Breadcrumbs';
import Title from '@/components/UI/Title';
import TyreDiskSizeCalcComponent from '@/components/TyreDiskSizeCalc';

export default async function TyreDiskSizeCalc({ params }: { params: Promise<{ locale: string }> }) {
	const locale = (await params).locale;

	const path = [
		{
			title: 'tire calculator',
			translations: true,
			href: '/tyre-disk-size-calc'
		}
	];

	return (
		<LayoutWrapper>
			<Breadcrumbs path={ path } />
			<Title title='tire calculator' translations={ true } />
			<TyreDiskSizeCalcComponent locale={ locale } />
		</LayoutWrapper>
	)
};
