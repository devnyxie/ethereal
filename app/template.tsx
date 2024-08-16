export default function Template({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative px-2.5 lg:px-0 flex-grow page-intro-animation overflow-hidden background-pattern">
      <div className="container pt-[2rem]">{children}</div>
    </div>
  );
}
