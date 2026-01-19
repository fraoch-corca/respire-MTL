'use client';

import { NextIntlClientProvider, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export function LanguageSwitcher () {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const active = 'capitalize font-bold';
    const inactive = 'capitalize opacity-80 cursor-pointer hover:rotate-10 focus:rotate-10';
    
    const switchLocale = (newLocale: string) => {
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);

        console.log('/////////////// change route LS //////////////');
        router.push(newPath);
    };

    const setActiveState = (checkLocale: string) => checkLocale === locale ? active : inactive;

    return (
        <NextIntlClientProvider locale={locale}>
            <div className="flex gap-2">
               <button
                    onClick={() => switchLocale('en')}
                    className={setActiveState('en')}
                >
                    En
                </button>
                <span> | </span>
                <button
                    onClick={() => switchLocale('fr')}
                    className={setActiveState('fr')}
                >
                    Fr
                </button>
            </div>
        </NextIntlClientProvider>
    )
}