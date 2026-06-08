import { useEffect, useState } from "react";

export type BucketStatus = "good" | "bad" | "no-info";

interface WebsiteCardProps {
  id: string;
  url: string;
  statusBuckets: BucketStatus[];
  onDelete: (id: string) => void;
}

interface RegionalLatency {
  region: string;
  latency: number;
  status: "UP" | "DOWN";
}

const getBucketColorClass = (status: BucketStatus) => {
  if (status === "bad") {
    return "bg-red-500 shadow-sm shadow-red-500/20";
  }
  if (status === "good") {
    return "bg-green-700 shadow-sm shadow-green-500/20";
  }
  return "bg-zinc-300 dark:bg-zinc-800";
};

export function WebsiteCard({ id, url, statusBuckets, onDelete }: WebsiteCardProps) {
  const [latencyData, setLatencyData] = useState<RegionalLatency[]>([]);

  useEffect(() => {
    const fetchLatency = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const response = await fetch(`http://localhost:8080/api/v1/website/${id}/latency`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setLatencyData(data);
        }
      } catch (e) {
        console.error("Failed to fetch latency", e);
      }
    };
    fetchLatency();

    const intervalId = window.setInterval(() => {
      fetchLatency();
    }, 60_000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [id]);

  return (
    <div className="flex min-w-7xl gap-10">
      <div className="group mt-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-gray-50 dark:bg-[#0a0a0a] p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 flex flex-col gap-4">
        <div className="flex flex-col flex-1">
          <div className="mb-4 flex items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284" />
                </svg>
              </div>
              <p className="truncate font-semibold text-zinc-900 dark:text-white transition-colors duration-300">{url}</p>
            </div>
            <button
              type="button"
              onClick={() => onDelete(id)}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-400 dark:text-zinc-500 hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
            >
              Delete
            </button>
          </div>

          <div className="flex items-center gap-1.5 px-1 py-2">
            {statusBuckets.map((status, index) => (
              <div
                key={index}
                className={`group/tick relative h-3 flex-1 rounded-sm ${getBucketColorClass(status)} hover:opacity-80 transition-opacity cursor-pointer`}
              >
                <div className="pointer-events-none absolute -top-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-200 dark:bg-zinc-800 px-2 py-1 text-xs shadow-lg ring-1 ring-black/5 dark:ring-white/10 opacity-0 transition-opacity group-hover/tick:opacity-100">
                  {status === "good" && <span className="text-emerald-600 dark:text-emerald-400 font-medium">Good</span>}
                  {status === "bad" && <span className="text-red-500 dark:text-red-400 font-medium">Bad</span>}
                  {status === "no-info" && <span className="text-zinc-500 dark:text-zinc-400 font-medium">Unknown</span>}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-2 pl-1 text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Last 30 minutes uptime
          </p>
        </div>

      </div>

      {latencyData.length > 0 ? (
        <div className="mt-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-gray-50 dark:bg-[#0a0a0a] p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 flex flex-col gap-4">
          <div className="w-full">
            <div className="grid grid-cols-3 items-center gap-10 border-b border-zinc-200 dark:border-zinc-800/80 px-2 pb-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              <span className="text-left">Region</span>
              <span className="text-center">Latency</span>
              <span className="text-right">Status</span>
            </div>

            <div className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800/40">
              {latencyData.map((reg) => (
                <div key={reg.region} className="grid grid-cols-3 items-center gap-2 px-2 py-3 text-sm">
                  <span className="truncate text-left text-xs font-mono text-zinc-600 dark:text-zinc-300">{reg.region.toLowerCase()}</span>
                  <span className="text-center text-xs font-mono text-zinc-600 dark:text-zinc-300">{reg.latency}ms</span>
                  <span
                    className={`text-right text-xs font-mono font-semibold ${reg.status.toUpperCase() === "UP" ? "text-green-600 dark:text-green-500" : "text-red-600 dark:text-red-500"}`}
                  >
                    {reg.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-gray-50/50 dark:bg-[#0c0c0c]/50 p-4 shadow-inner flex flex-col items-center justify-center gap-2 min-w-[280px] text-zinc-400 dark:text-zinc-500 text-xs transition-colors duration-300">
          <svg className="h-5 w-5 text-zinc-400 dark:text-zinc-500 animate-pulse" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <span className="font-medium">No data available</span>
        </div>
      )}
    </div>
  );
}