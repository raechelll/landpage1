import type { Metadata } from "next";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import { siteDescription, siteTitle, siteUrl } from "@/lib/site";
import { SitePreferences } from "@/components/SitePreferences";
import "./globals.css";
import "./themes.css";

// Migrate existing local preferences once; subsequent requests render the saved
// language on the server and never need a client-side language correction.
const initializeTheme = `(function(){
  var p=null;try{p=JSON.parse(localStorage.getItem('bukanota.preferences.v1')||'null');}catch(e){}
  try{
    var read=function(name){var c=document.cookie.split(';').find(function(c){return c.trim().indexOf(name+'=')===0;});return c?c.trim().slice(name.length+1):null;};
    if(!read('bukanota-language')&&p&&(p.language==='id'||p.language==='en')){
      document.cookie='bukanota-language='+p.language+'; Path=/; Max-Age=31536000; SameSite=Lax'+(location.protocol==='https:'?'; Secure':'');
      if(read('bukanota-language')===p.language&&document.documentElement.lang!==p.language){location.reload();return;}
    }
    var t=read('bukanota-theme')||(p&&p.theme)||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
    document.documentElement.dataset.theme=t==='dark'?'dark':'light';
  }catch(e){}
})();`;

const manrope = localFont({
  src: "../public/fonts/manrope.woff2",
  weight: "400 800",
  variable: "--font-heading",
  display: "swap",
});
const dmSans = localFont({
  src: "../public/fonts/dm-sans.woff2",
  weight: "400 700",
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: siteTitle,
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName: "BukaNota",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "BukaNota — Business operations and financial management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const preferences = await cookies();
  const language = preferences.get("bukanota-language")?.value === "id" ? "id" : "en";
  const theme = preferences.get("bukanota-theme")?.value === "dark" ? "dark" : "light";
  return (
    <html lang={language} data-theme={theme} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: initializeTheme }} /></head>
      <body className={`${manrope.variable} ${dmSans.variable}`}>
        <SitePreferences initialLanguage={language} initialTheme={theme}>{children}</SitePreferences>
      </body>
    </html>
  );
}
