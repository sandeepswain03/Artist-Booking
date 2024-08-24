import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to access your account.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            {children}
        </>
    );
}