import Navbar from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
