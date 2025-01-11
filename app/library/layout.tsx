import HomeLayout from "../(shared)/components/HomeLayout"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <HomeLayout>{children}</HomeLayout>
}
