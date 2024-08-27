import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Reset your password.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
