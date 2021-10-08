import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="main">{children}</main>

      <footer className="footer">This is footer</footer>
    </div>
  );
}
