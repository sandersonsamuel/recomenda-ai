import "@/app/globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "RecomendaAI - Descubra Filmes com Inteligência Artificial",
  description:
    "Receba recomendações de filmes personalizadas com base em inteligência artificial. Encontre o filme ideal para seu gosto de forma rápida e inteligente.",
  keywords: [
    "filmes",
    "recomendações",
    "IA",
    "inteligência artificial",
    "cinema",
    "filme personalizado",
    "recomendação de filmes",
  ],
  authors: [{ name: "RecomendaAI" }],
  creator: "RecomendaAI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
  openGraph: {
    title: "RecomendaAI - Descubra Filmes com Inteligência Artificial",
    description:
      "Recomendações de filmes feitas por IA, sob medida para você. Navegue por sugestões personalizadas com um clique.",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: "RecomendaAI",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "icon.svg",
        width: 1200,
        height: 630,
        alt: "Imagem de capa RecomendaAI com inteligência artificial e cinema",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RecomendaAI - Encontre filmes com IA",
    description:
      "Receba recomendações personalizadas de filmes baseadas em inteligência artificial.",
    images: ["icon.svg"],
    creator: "@pich0la",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

const font = JetBrains_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${font.className} antialiased dark max-w-full`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
