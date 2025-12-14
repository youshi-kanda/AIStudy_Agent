import "./globals.css";

export const metadata = {
  title: "Debug Layout",
  description: "Debugging",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div className="border border-red-500 p-4">
          <h1 className="text-xs text-red-500">DEBUG LAYOUT ACTIVE</h1>
          {children}
        </div>
      </body>
    </html>
  );
}
