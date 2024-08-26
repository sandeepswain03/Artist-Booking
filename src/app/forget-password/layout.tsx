import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forget password",
    description: "Send a reset password email.",
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