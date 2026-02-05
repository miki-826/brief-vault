import { useMemo } from "react";
import { renderMarkdown } from "../lib/markdown";

type Props = {
  markdown?: string;
  loading?: boolean;
  error?: string;
};

export function Viewer({ markdown, loading, error }: Props) {
  const html = useMemo(() => (markdown ? renderMarkdown(markdown) : ""), [markdown]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-5 w-48 animate-pulse rounded bg-white/10" />
        <div className="mt-4 space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-white/10" />
          <div className="h-3 w-11/12 animate-pulse rounded bg-white/10" />
          <div className="h-3 w-10/12 animate-pulse rounded bg-white/10" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          {error}
        </div>
      </div>
    );
  }

  if (!markdown) {
    return (
      <div className="p-10 text-sm text-white/55">
        左のリストからレポートを選択してください。
      </div>
    );
  }

  return (
    <article className="prose prose-invert max-w-none p-6 prose-headings:scroll-mt-20">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
