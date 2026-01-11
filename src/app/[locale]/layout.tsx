import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {routing} from '@/src/i18n/routing';

 
type Props = {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
};
 
export default async function RootLayout({children}: Props) {
  return (
    // <html>
    //   <body>
    //     <NextIntlClientProvider>{children}</NextIntlClientProvider>
    //   </body>
    // </html>
    <NextIntlClientProvider>{children}</NextIntlClientProvider>
  );
}