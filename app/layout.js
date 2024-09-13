import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "TechTrail",
  description: "Master Tech, One Step at a Time",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        layout: {
          logoImageUrl: '/techtrail-logo.png',
          socialButtonsVariant: 'iconButton'
        },
        variables: {
          colorText: '#FAFAFA',
          colorPrimary: '#0ec4e8',
          colorBackground: '#18191a',
          colorInputBackground: '#111212',
          colorInputText: '#FAFAFA'
        }
      }}
    >
      <html lang="en">
        <head>
          <link rel="icon" type="image/svg+xml" href="/techtrail-logo.png" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
