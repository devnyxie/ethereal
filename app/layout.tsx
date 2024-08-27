import type { Metadata } from "next";
import { ThemeProvider } from "../components/theme/theme-provider";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import "./styles/globals.css";
import "./styles/grain.css";
import Config from "@/content/config";

export const metadata = {
  title: Config.site.title,
  description: Config.site.description,
  metadataBase: Config.site.url,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicons/apple-icon.png"
        />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicons/icon.png"
        />
      </head>
      <body className={Config.settings.grain ? "grain" : ""}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div
            className={`relative flex flex-col min-h-screen ${
              Config.settings.header.fixed ? "pt-[4.5rem]" : ""
            }`}
          >
            <Header />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
