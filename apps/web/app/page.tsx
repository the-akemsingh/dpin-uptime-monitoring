"use client";

import { useCallback, useEffect, useState } from "react";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { WebsiteCard } from "../components/dashboard/WebsiteCard";

type Tick = {
  id: string;
  time: string;
  status: "Good" | "Bad";
  latency: string;
  websiteId: string;
  validatorId: string;
};

type Website = {
  id: string;
  url: string;
  ticks: Tick[];
};

type BucketStatus = "good" | "bad" | "no-info";

const THIRTY_MINUTES_MS = 30 * 60 * 1000;
const THREE_MINUTES_MS = 3 * 60 * 1000;
const TOTAL_BUCKETS = 10;

const getStatusPriority = (status: BucketStatus) => {
  if (status === "bad") {
    return 2;
  }
  if (status === "good") {
    return 1;
  }
  return 0;
};

const normalizeTickStatus = (status: string): BucketStatus => {
  const lowerStatus = status.toLowerCase();
  if (lowerStatus === "bad" || lowerStatus === "down") {
    return "bad";
  }
  if (lowerStatus === "good" || lowerStatus === "up") {
    return "good";
  }
  return "no-info";
};

const buildWebsiteStatusBuckets = (ticks: Tick[]): BucketStatus[] => {
  const now = Date.now();
  const rangeStart = now - THIRTY_MINUTES_MS;
  const buckets: BucketStatus[] = Array.from({ length: TOTAL_BUCKETS }, () => "no-info");

  for (const tick of ticks) {
    const tickTime = new Date(tick.time).getTime();
    if (Number.isNaN(tickTime) || tickTime < rangeStart || tickTime > now) {
      continue;
    }

    const rawBucketIndex = Math.floor((tickTime - rangeStart) / THREE_MINUTES_MS);
    const bucketIndex = Math.min(Math.max(rawBucketIndex, 0), TOTAL_BUCKETS - 1);
    const nextStatus = normalizeTickStatus(tick.status);
    const currentStatus = buckets[bucketIndex] ?? "no-info";

    if (getStatusPriority(nextStatus) > getStatusPriority(currentStatus)) {
      buckets[bucketIndex] = nextStatus;
    }
  }

  return buckets;
};

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  const fetchWebsites = useCallback(async (activeToken: string, showLoader = false) => {
    if (showLoader) {
      setIsLoading(true);
    }
    try {
      const response = await fetch("http://localhost:8080/api/v1/websites", {
        headers: {
          Authorization: `Bearer ${activeToken}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.dispatchEvent(new Event("auth-changed"));
          setToken(null);
          setWebsites([]);
        }
        return;
      }

      const data = (await response.json()) as Website[];
      setWebsites(data);
    } finally {
      if (showLoader) {
        setIsLoading(false);
      }
      setHasLoadedOnce(true);
    }
  }, []);

  useEffect(() => {
    const syncAuthState = () => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);

      if (storedToken) {
        fetchWebsites(storedToken, !hasLoadedOnce);
      } else {
        setWebsites([]);
      }
    };

    syncAuthState();
    window.addEventListener("auth-changed", syncAuthState);

    const intervalId = window.setInterval(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        fetchWebsites(storedToken, false);
      }
    }, 60_000);

    return () => {
      window.removeEventListener("auth-changed", syncAuthState);
      window.clearInterval(intervalId);
    };
  }, [fetchWebsites, hasLoadedOnce]);

  const handleAddWebsite = async () => {
    if (!token || !url.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8080/api/v1/website", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!response.ok) {
        return;
      }

      setUrl("");
      await fetchWebsites(token, false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteWebsite = async (websiteId: string) => {
    if (!token) {
      return;
    }

    const response = await fetch(`http://localhost:8080/api/v1/website/${websiteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return;
    }

    setWebsites((prev) => prev.filter((website) => website.id !== websiteId));
  };

  return (
    <DashboardLayout isLoggedIn={!!token}>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6 transition-colors duration-300">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white transition-colors duration-300">Your Websites</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Monitor your web properties in real-time.</p>
        </div>

        {token ? (
          <div className="flex w-full gap-3 md:w-auto relative group">
            <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            <div className="relative flex w-full gap-2 rounded-xl bg-gray-50 dark:bg-[#0a0a0a] p-1 border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full rounded-lg border-0 bg-transparent px-4 py-2.5 text-sm text-zinc-900 dark:text-white outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-500 md:w-80 focus:bg-zinc-100 dark:focus:bg-[#111] transition-colors duration-300"
              />
              <button
                type="button"
                onClick={handleAddWebsite}
                disabled={isSubmitting || !url.trim()}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? "Adding..." : "Add Website"}
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {!token ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-gray-50 dark:bg-[#0a0a0a] p-12 text-center text-zinc-500 dark:text-zinc-400 shadow-inner transition-colors duration-300">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 dark:bg-[#111] border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
            <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-white transition-colors duration-300">Sign in required</h3>
          <p className="mt-1">Please login from the navbar to view and manage your websites.</p>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 dark:border-zinc-800 border-t-blue-500 transition-colors duration-300"></div>
          <p className="mt-4 text-sm font-medium text-zinc-500">Loading your websites...</p>
        </div>
      ) : websites.length === 0 ? (
        <div className="relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gray-50 dark:bg-[#111] p-12 text-center shadow-lg transition-colors duration-300">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors duration-300">
            <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mt-4 text-xl font-bold text-zinc-900 dark:text-white transition-colors duration-300">No websites added yet</h3>
          <p className="mt-2 text-zinc-500 dark:text-zinc-400">Get started by adding your first website above to begin monitoring.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
          {websites.map((website) => {
            const statusBuckets = buildWebsiteStatusBuckets(website.ticks || []);
            return (
              <WebsiteCard
                key={website.id}
                id={website.id}
                url={website.url}
                statusBuckets={statusBuckets}
                onDelete={handleDeleteWebsite}
              />
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}
