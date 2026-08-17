import { useState } from "react";

interface ShareExportBarProps {
  onCopyLink: () => Promise<void>;
}

export function ShareExportBar({ onCopyLink }: ShareExportBarProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await onCopyLink();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="no-print flex items-center gap-3">
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-ink-soft hover:border-accent/40 hover:text-ink transition-colors"
      >
        {copied ? "Link copiado" : "Copiar link para compartir"}
      </button>
      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-4 py-2.5 text-sm font-medium text-ink-soft hover:border-accent/40 hover:text-ink transition-colors"
      >
        Exportar / Imprimir
      </button>
    </div>
  );
}
