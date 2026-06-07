import { ReactNode } from "react";
import { HeroSection } from "./HeroSection";
import { FeaturesGrid } from "./FeaturesGrid";
import { CtaSection } from "./CtaSection";
import { Footer } from "./Footer";
import Navbar from "../ui/Navbar";

interface DashboardLayoutProps {
    children?: ReactNode;
    isLoggedIn?: boolean;
}

export function DashboardLayout({ children, isLoggedIn = false }: DashboardLayoutProps) {
    return (
        <main className="relative min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-zinc-700 dark:text-zinc-300 font-sans selection:bg-blue-500/30 selection:text-blue-200 transition-colors duration-300">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 z-0 h-200 w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]"></div>

            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                <Navbar />

                {!isLoggedIn && (
                    <>
                        <HeroSection />
                        <FeaturesGrid />
                    </>
                )}

                {/* User's Application Dashboard Logic */}
                {isLoggedIn && children && (
                    <div className="pt-32 w-full min-h-screen relative">
                        {/* <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-blue-500/10 to-purple-500/10 blur-xl opacity-50"></div> */}
                        <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800/60 bg-white dark:bg-[#111] p-8 shadow-lg dark:shadow-2xl backdrop-blur-xl transition-colors duration-300">
                            {children}
                        </div>
                    </div>
                )}

                {/* <Integrations /> */}
                {!isLoggedIn && <CtaSection />}
            </div>
            <Footer />
        </main>
    );
}