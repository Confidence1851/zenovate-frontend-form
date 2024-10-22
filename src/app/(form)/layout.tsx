import FormStepsSidebar from "@/components/navigation/FormStepsSidebar";
import MobileTopNav from "@/components/navigation/MobileTopNav";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="lg:flex">
      {/* mobile navigation */}
      <MobileTopNav />
      {/* form sidebar */}
      <FormStepsSidebar />
      <div className="flex-1 flex justify-center items-center flex-col p-4">
        {children}
      </div>
    </main>
  );
}
