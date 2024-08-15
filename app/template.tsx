export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container px-2.5 pt-10 lg:px-0 flex-grow page-intro-animation">
      {children}
    </div>
  );
}
