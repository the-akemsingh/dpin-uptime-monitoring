"use client";

import { useState } from "react";

const setupSteps = [
  {
    step: 1,
    title: "Install Node.js & Bun",
    code: `# Check Node.js (v18+ required)
node --version

# Install Node via nvm if not present
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
nvm install 20 && nvm use 20

# Install Bun (the runtime used by the validator)
curl -fsSL https://bun.sh/install | bash`,
    lang: "bash",
  },
  {
    step: 2,
    title: "Clone the validator repo",
    code: `git clone https://github.com/the-akemsingh/dpin-uptime-monitoring-validator.git
cd dpin-uptime-monitoring-validator`,
    lang: "bash",
  },
  {
    step: 3,
    title: "Install dependencies",
    code: `bun install`,
    lang: "bash",
  },
  {
    step: 4,
    title: "Get your Phantom private key",
    code: `# Steps to export your private key from Phantom Wallet:
# 1. Open Phantom browser extension
# 2. Click the gear icon → Settings
# 3. Go to Manage Accounts
# 4. Select the account you want to use
# 5. Click "Show Private Key" and confirm with password
# 6. Copy the base58 private key string shown

# ⚠️  NEVER share your private key with anyone.
# ⚠️  Create a dedicated burner wallet — do NOT use your main wallet.`,
    lang: "bash",
  },
  {
    step: 5,
    title: "Configure environment variables",
    code: `# Create your .env file in the project root
cp .env.example .env

# Open .env and fill in your values:
PRIVATE_KEY=<your_phantom_base58_private_key>
WS_URL=wss://hub.pingsy.io`,
    lang: "env",
  },
  {
    step: 6,
    title: "Start the validator",
    code: `bun run dev

# Expected output:
# Connecting to hub...
# Validator registered: val_xxxxxxxxxxxx
# Waiting for validation requests...`,
    lang: "bash",
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-2.5 py-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200 cursor-pointer"
      title="Copy to clipboard"
    >
      {copied ? (
        <>
          <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-emerald-500">Copied!</span>
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

export function ValidatorSetup() {
  const [activeStep, setActiveStep] = useState(0);
  const current = setupSteps[activeStep]!;
  const isKeyStep = activeStep === 3; // Step 4: Phantom private key

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 dark:border-blue-800/50 bg-blue-50 dark:bg-blue-900/20 px-4 py-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Developer Setup
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl transition-colors duration-300">
            Validator Setup Guide
          </h2>
          <p className="mt-4 text-lg leading-8 text-zinc-500 dark:text-zinc-400">
            Get your validator running in under 5 minutes. Follow each step below.
          </p>
        </div>

        {/* Interactive code walkthrough */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Step selector sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-2">
            {setupSteps.map((s, i) => (
              <button
                key={s.step}
                onClick={() => setActiveStep(i)}
                className={`group flex items-start gap-4 rounded-xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                  activeStep === i
                    ? "border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 shadow-md"
                    : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-extrabold transition-colors duration-200 ${
                    activeStep === i
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {s.step}
                </span>
                <span
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    activeStep === i
                      ? "text-blue-700 dark:text-blue-300"
                      : "text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {s.title}
                </span>
              </button>
            ))}
          </div>

          {/* Code panel */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111] shadow-xl overflow-hidden transition-colors duration-300">
              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-gray-50 dark:bg-[#0a0a0a] px-4 py-3 transition-colors duration-300">
                <div className="flex items-center gap-2">
                  {/* Traffic light buttons */}
                  <span className="h-3 w-3 rounded-full bg-red-400 dark:bg-red-600" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400 dark:bg-yellow-600" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400 dark:bg-emerald-600" />
                  <span className="ml-2 text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                    Step {current.step} — {current.title}
                  </span>
                </div>
                <CopyButton text={current.code} />
              </div>

              {/* Code block */}
              <pre className="overflow-x-auto p-6 text-sm leading-relaxed font-mono bg-[#fafafa] dark:bg-[#0d0d0d] text-zinc-700 dark:text-zinc-300 transition-colors duration-300">
                <code>
                  {current.code.split("\n").map((line, i) => {
                    const isComment = line.trim().startsWith("#");
                    return (
                      <span key={i} className={isComment ? "text-zinc-400 dark:text-zinc-600" : ""}>
                        {line}
                        {"\n"}
                      </span>
                    );
                  })}
                </code>
              </pre>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 px-4 py-3 bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
                <button
                  onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
                  disabled={activeStep === 0}
                  className="flex items-center gap-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 disabled:opacity-40 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  Previous
                </button>

                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  {activeStep + 1} / {setupSteps.length}
                </span>

                <button
                  onClick={() => setActiveStep((p) => Math.min(setupSteps.length - 1, p + 1))}
                  disabled={activeStep === setupSteps.length - 1}
                  className="flex items-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 px-3 py-1.5 text-xs font-semibold text-white transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
                >
                  Next
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>

            {/* Tip box — context-aware */}
            {isKeyStep ? (
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 dark:border-red-800/40 bg-red-50 dark:bg-red-900/10 px-5 py-4 transition-colors duration-300">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                </svg>
                <p className="text-sm text-red-800 dark:text-red-200 leading-relaxed transition-colors duration-300">
                  <span className="font-semibold">Security warning:</span> Never use your main wallet&apos;s private key. Create a fresh, dedicated Solana wallet in Phantom just for validation. If the key is compromised, only that wallet is at risk.
                </p>
              </div>
            ) : (
              <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50 dark:bg-amber-900/10 px-5 py-4 transition-colors duration-300">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed transition-colors duration-300">
                  <span className="font-semibold">Pro tip:</span> Run your validator on a VPS (like DigitalOcean, Hetzner, or Linode) for maximum uptime and earnings. A $5/month droplet is more than enough. The <code className="font-mono bg-amber-100 dark:bg-amber-900/30 px-1 rounded">WS_URL</code> will be the Pingsy hub address shared when you join.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
