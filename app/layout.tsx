import type { Metadata } from "next";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Aleksander Stevens | AI, Finance, and Systems",
  description:
    "A futuristic personal portfolio for Aleksander Stevens featuring finance dashboards, recruiter mode, and an AI assistant.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">{children}</body>
    </html>
  );
}
