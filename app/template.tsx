export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex-grow overflow-hidden">
      <div className="container pt-[2rem]">{children}</div>
    </div>
  );
}
