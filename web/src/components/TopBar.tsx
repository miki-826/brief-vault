type Props = {
  title: string;
  subtitle?: string;
  onToggleTheme?: () => void;
};

export function TopBar({ title, subtitle, onToggleTheme }: Props) {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
      <div className="min-w-0">
        <div className="truncate text-sm font-semibold text-white">{title}</div>
        {subtitle ? (
          <div className="truncate text-xs text-white/60">{subtitle}</div>
        ) : null}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleTheme}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
        >
          テーマ
        </button>
        <a
          href="https://github.com/miki-826/brief-vault"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}
