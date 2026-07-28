import { createFileRoute, Outlet } from "@tanstack/react-router";
import mal1688Css from "@/styles/mal1688.css?url";
import { Header } from "@/components/mal1688/Header";
import { Footer } from "@/components/mal1688/Footer";

export const Route = createFileRoute("/mal1688")({
  head: () => ({
    meta: [{ title: "MitoActiveLife 活「粒」生活 - 專業全家與兒童複合鈣矩陣" }],
    links: [{ rel: "stylesheet", href: mal1688Css }],
  }),
  component: Mal1688Layout,
});

function Mal1688Layout() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] text-slate-800 overflow-x-hidden">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
