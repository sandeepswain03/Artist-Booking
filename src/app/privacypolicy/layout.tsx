import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description: "View our privacy policy for the Artist Booking App.",
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