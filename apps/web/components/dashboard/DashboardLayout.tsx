import { ReactNode } from "react";
import { HeroSection } from "./HeroSection";
import { FeaturesGrid } from "./FeaturesGrid";
import { HowItWorks } from "./HowItWorks";
import { ValidatorEconomy } from "./ValidatorEconomy";
import { BecomeValidator } from "./BecomeValidator";
import { ValidatorSetup } from "./ValidatorSetup";
import { CtaSection } from "./CtaSection";
import { Footer } from "./Footer";
import Navbar from "../ui/Navbar";

interface DashboardLayoutProps {
    children?: ReactNode;
    isLoggedIn?: boolean;
}

export function DashboardLayout({ children, isLoggedIn = false }: DashboardLayoutProps) {
    return (
        <main className="relative min-h-screen bg-gray-50 dark:bg-[#09090b] text-zinc-700 dark:text-zinc-300 font-sans selection:bg-blue-500/30 selection:text-blue-200 transition-colors duration-300 overflow-x-hidden">

            {/* Fine grid pattern background */}
            <div className="absolute inset-0 z-0 pointer-events-none h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />

            {/* Radial fade-out at center so grid doesn't compete with content */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,transparent_0%,rgba(249,250,251,0.9)_70%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,transparent_0%,rgba(9,9,11,0.9)_70%)]" />

            <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <Navbar />

                {!isLoggedIn && (
                    <>
                        <HeroSection />
                        <FeaturesGrid />
                        <HowItWorks />
                        <ValidatorEconomy />
                        <BecomeValidator />
                        <ValidatorSetup />
                    </>
                )}

                {/* User Dashboard */}
                {isLoggedIn && children && (
                    <div className="pt-32 w-full min-h-screen relative">
                        <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] p-8 shadow-xl dark:shadow-2xl transition-colors duration-300">
                            {children}
                        </div>
                    </div>
                )}

                {!isLoggedIn && <CtaSection />}
            </div>

            <Footer />

            {/* Bottom fade gradient */}
            <div className="pointer-events-none fixed bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-gray-50 dark:from-[#09090b] to-transparent z-40 transition-colors duration-300" />
        </main>
    );
}