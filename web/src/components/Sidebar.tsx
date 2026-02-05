import type { ReportMeta } from "../lib/api";

type Props = {
  reports: ReportMeta[];
  active?: string;
  query: string;
  onQueryChange: (v: string) => void;
  onSelect: (name: string) => void;
};

function formatDate(d?: string) {
  if (!d) return "";
  return d;
}

export function Sidebar({ reports, active, query, onQueryChange, onSelect }: Props) {
  return (
    <aside className="flex h-full w-full flex-col border-r border-white/10 bg-black/20">
      <div className="p-3">
        <div className="text-xs font-semibold text-white/70">レポート</div>
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="検索（タイトル / ファイル名）"
          className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/25"
        />
      </div>

      <div className="flex-1 overflow-auto px-2 pb-3">
        {reports.length === 0 ? (
          <div className="px-2 py-6 text-sm text-white/50">
            レポートがありません。<span className="text-white/70">reports/</span> に .md を置いてください。
          </div>
        ) : (
          <ul className="space-y-1">
            {reports.map((r) => {
              const isActive = r.name === active;
              return (
                <li key={r.name}>
                  <button
                    onClick={() => onSelect(r.name)}
                    className={
                      "w-full rounded-xl border px-3 py-2 text-left transition " +
                      (isActive
                        ? "border-white/20 bg-white/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10")
                    }
                  >
                    <div className="truncate text-sm font-semibold text-white">
                      {r.title || r.name}
                    </div>
                    <div className="mt-0.5 flex items-center justify-between gap-3 text-xs text-white/55">
                      <span className="truncate">{r.name}</span>
                      <span className="shrink-0">{formatDate(r.date)}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="border-t border-white/10 p-3 text-xs text-white/45">
        <div className="font-semibold text-white/60">ヒント</div>
        <div className="mt-1">新規追加→ <span className="text-white/70">reports/2026-02-06.md</span> など</div>
      </div>
    </aside>
  );
}
