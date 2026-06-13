import type { Metadata } from "next";
import { createTheme, MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import "vazirmatn/Vazirmatn-font-face.css";
import "./globals.css";
import '@mantine/charts/styles.css';

export const metadata: Metadata = {
  title: "Hospital Income Manager",
  description: "سامانه مدیریت درآمد بیمارستان‌ها",
};

// @ts-ignore
const theme = createTheme({
    fontFamily: 'Vazirmatn'
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="fa" dir="rtl">
            <body
                style={{background: 'linear-gradient(60deg, rgb(77 171 247) 0%, rgb(24 100 171) 100%)'}} >
                <MantineProvider theme={theme}>
                    {children}
                </MantineProvider>
            </body>
        </html>
  );
}

