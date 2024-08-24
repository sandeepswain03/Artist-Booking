import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms and Conditions",
    description: "View our terms and conditions for using the Artist Booking App.",
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