import { Lora, Montserrat } from "next/font/google";
import type { Metadata } from "next";
import { LocaleProvider } from "@/lib/i18n/Locale_context";
import { getLocale } from "@/lib/i18n/get-locale";
import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Claire Wu Website",
  description: "Personal portfolio and coursework showcase for Claire Wu.",
  manifest: "/manifest.json",
};


const lora = Lora({ subsets: ["latin"] })
const montserrat = Montserrat({ subsets: ["latin"] })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <head>
        <meta name="apple-mobile-web-app-title" content="Claire Wu" />

        <link
          href="https://fonts.googleapis.com/css2?family=Kapakana&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          "--font-body": lora.style.fontFamily,
          "--font-nav": montserrat.style.fontFamily,
          "--font-heading": "'Kapakana', serif",
        } as React.CSSProperties}
      >
        <LocaleProvider initialLocale={locale}>
          <div className="bg-background">
            <Nav/>
            {children}
            
            <Footer/>
          </div>
        </LocaleProvider>
      </body>
    </html>
  )
}