import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div>
      <Header/>
    <div className="flex min-h-screen bg-blue-100">
      <Sidebar />
      <main className="flex-1 bg-zinc-100 p-6">{children}</main>
    </div>
    <Footer/>
    </div>
  );
}

