import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { Language } from '@/models/language';

export const routing = defineRouting({
	locales: [ Language.UK, Language.RU ],
	defaultLocale: Language.UK,
	localeDetection: false,
});

export const { Link, getPathname, redirect, usePathname, useRouter } =
	createNavigation(routing);