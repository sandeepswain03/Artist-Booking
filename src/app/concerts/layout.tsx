import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Concerts",
    description: "Explore our upcoming concerts and book your tickets now.",
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