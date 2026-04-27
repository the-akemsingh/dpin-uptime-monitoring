"use client";

import { useCallback, useEffect, useState } from "react";

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

const getBucketColorClass = (status: BucketStatus) => {
  if (status === "bad") {
    return "bg-red-500";
  }
  if (status === "good") {
    return "bg-emerald-500";
  }
  return "bg-zinc-600";
};


export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [websites, setWebsites] = useState<Website[]>([]);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchWebsites = useCallback(async (activeToken: string) => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const syncAuthState = () => {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);

      if (storedToken) {
        fetchWebsites(storedToken);
      } else {
        setWebsites([]);
      }
    };

    syncAuthState();
    window.addEventListener("auth-changed", syncAuthState);

    return () => {
      window.removeEventListener("auth-changed", syncAuthState);
    };
  }, [fetchWebsites]);

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
      await fetchWebsites(token);
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
    <main className="min-h-[calc(100vh-4rem)] bg-zinc-950 px-4 py-8 text-zinc-100">
      <div className="mx-auto w-full max-w-4xl rounded-xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-xl font-semibold">Your Websites</h2>

          {token ? (
            <div className="flex w-full gap-2 md:w-auto">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm outline-none placeholder:text-zinc-500 focus:border-zinc-500 md:w-80"
              />
              <button
                type="button"
                onClick={handleAddWebsite}
                disabled={isSubmitting || !url.trim()}
                className="rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Adding..." : "Add Website"}
              </button>
            </div>
          ) : null}
        </div>

        {!token ? (
          <p className="rounded-md border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300">
            Please login from the navbar to view and manage your websites.
          </p>
        ) : isLoading ? (
          <p className="text-sm text-zinc-300">Loading websites...</p>
        ) : websites.length === 0 ? (
          <p className="rounded-md border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-300">
            No websites yet. Add your first website above.
          </p>
        ) : (
          <div className="space-y-3">
            {websites.map((website) => (
              (() => {
                const statusBuckets = buildWebsiteStatusBuckets(website.ticks || []);

                return (
                  <div
                    key={website.id}
                    className="rounded-md border border-zinc-800 bg-zinc-950 px-4 py-3"
                  >
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <p className="truncate pr-3 text-sm text-zinc-100">{website.url}</p>
                      <button
                        type="button"
                        onClick={() => handleDeleteWebsite(website.id)}
                        className="rounded-md border border-red-500 px-3 py-1 text-sm text-red-300 hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {statusBuckets.map((status, index) => (
                        <div
                          key={`${website.id}-${index}`}
                          className={`h-2.5 w-full rounded ${getBucketColorClass(status)}`}
                          title={`Window ${index + 1}: ${status}`}
                        />
                      ))}
                    </div>

                    <p className="mt-2 text-xs text-zinc-400">
                      Last 30 minutes
                    </p>
                  </div>
                );
              })()
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
