import Image from "next/image";
import AQIPage from "../app/aqi/page";

import { NextIntlClientProvider, useTranslations } from "next-intl";

export default function Hero() {
    const t = useTranslations();

    return (
        <NextIntlClientProvider>
            <div>
                <h1>{t('common.appName')} - {t('common.welcome')}</h1>
                <Image
                    src="https://images.pexels.com/photos/210893/pexels-photo-210893.jpeg"
                    alt="cycling"
                    width={480}
                    height={360}
                    priority
                /> 
                <AQIPage /> 
            </div>
        </NextIntlClientProvider>
    )
}
