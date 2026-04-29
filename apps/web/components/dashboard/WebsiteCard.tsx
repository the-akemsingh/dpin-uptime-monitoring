export type BucketStatus = "good" | "bad" | "no-info";

interface WebsiteCardProps {
  id: string;
  url: string;
  statusBuckets: BucketStatus[];
  onDelete: (id: string) => void;
}

const getBucketColorClass = (status: BucketStatus) => {
  if (status === "bad") {
    return "bg-red-500 shadow-sm shadow-red-500/20";
  }
  if (status === "good") {
    return "bg-emerald-500 shadow-sm shadow-emerald-500/20";
  }
  return "bg-zinc-800";
};

export function WebsiteCard({ id, url, statusBuckets, onDelete }: WebsiteCardProps) {
  return (
    <div className="group rounded-xl border border-zinc-800 bg-[#0a0a0a] p-4 shadow-sm transition-all duration-200 hover:shadow-md hover:border-zinc-700">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:bg-zinc-800 group-hover:text-blue-400 transition-colors duration-200">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
            </svg>
          </div>
          <p className="truncate font-semibold text-white">{url}</p>
        </div>
        <button
          type="button"
          onClick={() => onDelete(id)}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-500 hover:bg-red-500/10 hover:text-red-400 transition-colors duration-200"
        >
          Delete
        </button>
      </div>

      <div className="flex items-center gap-1.5 px-1 py-2">
        {statusBuckets.map((status, index) => (
          <div
            key={index}
            className={`h-6 flex-1 rounded-sm ${getBucketColorClass(status)} hover:opacity-80 transition-opacity cursor-help`}
            title={`Window ${index + 1}: ${status}`}
          />
        ))}
      </div>

      <p className="mt-2 pl-1 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
        Last 30 minutes uptime
      </p>
    </div>
  );
}