import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {routing} from '@/src/i18n/routing';

 
type Props = {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
};
 
export default async function RootLayout({children}: Props) {
  return (
    // Leaving these commented out as a reminder to look into the relationship between this layout.tsx and the main layout.tsx
    // <html>
    //   <body>
    //     <NextIntlClientProvider>{children}</NextIntlClientProvider>
    //   </body>
    // </html>
    <NextIntlClientProvider>{children}</NextIntlClientProvider>
  );
}