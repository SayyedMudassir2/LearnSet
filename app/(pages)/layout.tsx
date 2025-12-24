import Navbar from "@/app/components/Navbar";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="mt-12">
      {children}
      </main>
    </>
  );
}
