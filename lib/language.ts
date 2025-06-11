import { Language, LanguageCode } from '@/models/language';

export const language =  (locale: Language) => {
	return locale === Language.UK ? LanguageCode.UA : Language.RU;
};
