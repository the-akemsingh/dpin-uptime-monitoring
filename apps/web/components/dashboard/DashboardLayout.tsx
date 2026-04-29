import { ReactNode } from "react";
import { HeroSection } from "./HeroSection";
import { FeaturesGrid } from "./FeaturesGrid";
import { Integrations } from "./Integrations";
import { CtaSection } from "./CtaSection";
import { Footer } from "./Footer";
import Navbar from "../ui/Navbar";

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <main className="relative min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-blue-500/30 selection:text-blue-200">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 z-0 h-200 w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]"></div>

            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                <Navbar />

                <HeroSection />

                <FeaturesGrid />

                {/* User's Application Dashboard Logic */}
                <div className="my-20 w-full relative">
                    <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-blue-500/10 to-purple-500/10 blur-xl opacity-50"></div>
                    <div className="relative rounded-2xl border border-zinc-800/60 bg-[#111] p-8 shadow-2xl backdrop-blur-xl">
                        {children}
                    </div>
                </div>

                {/* <Integrations /> */}
                <CtaSection />
            </div>
            <Footer />
        </main>
    );
}