import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: any) {
  return (
    <div className="min-h-screen">
      <>
        <Header />
        <main>{children}</main>
        <Footer />
      </>
    </div>
  );
}
