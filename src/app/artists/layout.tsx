import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Artists",
    description: "Explore our talented artists and get to know the team behind Jas Oberoi Group.",
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