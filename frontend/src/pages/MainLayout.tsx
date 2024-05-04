import Header from "../Components/Layouts/Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: MainLayoutProps) {
  return (
    <main className="flex flex-col w-full h-full">
      <Header />
      <section className="flex flex-col p-6 bg-hero w-full h-full">
        {children}
      </section>
    </main>
  );
}
