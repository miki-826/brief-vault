import { useEffect, useMemo, useState } from "react";
import { fetchReportContent, fetchReports, type ReportMeta } from "./lib/api";
import { TopBar } from "./components/TopBar";
import { Sidebar } from "./components/Sidebar";
import { Viewer } from "./components/Viewer";

function normalize(s: string) {
  return s.toLowerCase();
}

export default function App() {
  const [reports, setReports] = useState<ReportMeta[]>([]);
  const [active, setActive] = useState<string | undefined>(undefined);
  const [query, setQuery] = useState("");
  const [markdown, setMarkdown] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const ac = new AbortController();
    fetchReports(ac.signal)
      .then((r) => {
        setReports(r);
        if (!active && r[0]?.name) setActive(r[0].name);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)));
    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!active) return;
    const ac = new AbortController();
    setLoading(true);
    setError(undefined);
    fetchReportContent(active, ac.signal)
      .then((md) => {
        setMarkdown(md);
        setLoading(false);
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : String(e));
        setLoading(false);
      });
    return () => ac.abort();
  }, [active]);

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return reports;
    return reports.filter((r) => {
      const hay = normalize(`${r.title} ${r.name}`);
      return hay.includes(q);
    });
  }, [reports, query]);

  return (
    <div className="h-full">
      <div className="mx-auto flex h-full max-w-[1400px] flex-col">
        <TopBar
          title="Brief Vault"
          subtitle="Markdownレポートのための、軽量で美しい閲覧ダッシュボード"
          onToggleTheme={() => {
            // placeholder: currently single dark theme
            alert("現在はダークテーマ固定です（次のイテレーションで切替対応）");
          }}
        />

        <div className="grid h-full grid-cols-1 md:grid-cols-[360px_1fr]">
          <div className="h-[48vh] md:h-full">
            <Sidebar
              reports={filtered}
              active={active}
              query={query}
              onQueryChange={setQuery}
              onSelect={setActive}
            />
          </div>

          <main className="h-full overflow-auto">
            <Viewer markdown={markdown} loading={loading} error={error} />
          </main>
        </div>
      </div>
    </div>
  );
}
