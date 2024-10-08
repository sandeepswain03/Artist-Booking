import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Sign up to create your account.",
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