export type ReportMeta = {
  name: string;
  title: string;
  date?: string; // ISO YYYY-MM-DD
  updatedAt?: string; // ISO
};

export async function fetchReports(signal?: AbortSignal): Promise<ReportMeta[]> {
  const res = await fetch("/api/reports", { signal });
  if (!res.ok) throw new Error(`Failed to load reports: ${res.status}`);
  return res.json();
}

export async function fetchReportContent(name: string, signal?: AbortSignal): Promise<string> {
  const res = await fetch(`/api/reports/${encodeURIComponent(name)}`, { signal });
  if (!res.ok) throw new Error(`Failed to load report: ${res.status}`);
  return res.text();
}
