// app/providers.tsx
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export async function Providers({ children }: { children: React.ReactNode }) {

  const messages = await getMessages();

  return <AntdRegistry>
      <NextIntlClientProvider messages={messages}>
        {children}
      </NextIntlClientProvider>
    </AntdRegistry>
}