import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Login | Vity",
  description: "",
};

export default function LoginLayout({
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