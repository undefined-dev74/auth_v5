const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500">
      {children}
    </div>
  );
};

export default AuthLayout;
