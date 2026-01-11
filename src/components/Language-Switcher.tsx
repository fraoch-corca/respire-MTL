'use client';

import { NextIntlClientProvider, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export function LanguageSwitcher () {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: string) => {
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
        router.push(newPath);
    };

    return (
        <NextIntlClientProvider locale={locale}>
            <div className="flex gap-2">
    =           <button
                    onClick={() => switchLocale('en')}
                    className={locale === 'en' ? 'font-bold' : 'opacity-80'}
                >
                    En
                </button>
                <span> | </span>
                <button
                    onClick={() => switchLocale('fr')}
                    className={locale === 'fr' ? 'font-bold' : 'opacity-80'}
                >
                    Fr
                </button>
            </div>
        </NextIntlClientProvider>
    )
}



// import * as React from "react";
// import { cn } from "@/lib/utils"

// function LanguageSwitcher({className, ...props}: React.ComponentProps<"langSwitcher">) {
//     // get current lang
//     const selectedClasses = "selected font-bold";
//     cons currentLang = "en";
//     const enClass = currentLang == 'en' ? selectedClasses : '';
//     const frClass = currentLang == 'fr' ? selectedClasses : '';
    
//     return(
//         <div
//             data-slot="language-switcher"
//             className={cn(
//                 "flex justify-between align-middl"
//             )}
//             {...props}
//             >
//                 <span 
//                     className="en {enClass}"
//                 >En</span>
//                  | 
//                 <span 
//                     className="fr {frClass}"
//                 >Fr</span>
//             </div>
//     )
// }

// export {
//     LanguageSwitcher
// }