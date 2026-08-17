import { parseSimpleMarkdown, renderInlineBold } from "@/lib/markdown";

interface ReportTextProps {
  status: "idle" | "loading" | "ready" | "error";
  text: string | null;
  onRetry?: () => void;
}

function InlineText({ text }: { text: string }) {
  const parts = renderInlineBold(text);
  return (
    <>
      {parts.map((p, i) =>
        p.bold ? (
          <strong key={i} className="font-semibold text-ink">
            {p.text}
          </strong>
        ) : (
          <span key={i}>{p.text}</span>
        )
      )}
    </>
  );
}

export function ReportText({ status, text, onRetry }: ReportTextProps) {
  if (status === "loading") {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-black/[0.06] rounded w-1/3" />
        <div className="h-3 bg-black/[0.06] rounded w-full" />
        <div className="h-3 bg-black/[0.06] rounded w-full" />
        <div className="h-3 bg-black/[0.06] rounded w-4/5" />
        <div className="h-4 bg-black/[0.06] rounded w-1/4 mt-6" />
        <div className="h-3 bg-black/[0.06] rounded w-full" />
        <div className="h-3 bg-black/[0.06] rounded w-3/4" />
        <p className="text-sm text-ink-faint pt-2">
          Redactando su diagnóstico personalizado…
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-5">
        <p className="text-sm text-red-800">
          No pudimos generar el informe en este momento. Por favor, intente nuevamente.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-3 text-sm font-medium text-red-800 underline underline-offset-2"
          >
            Reintentar
          </button>
        )}
      </div>
    );
  }

  if (status === "idle" || !text) {
    return (
      <div className="rounded-lg border border-dashed border-black/10 p-6 text-sm text-ink-faint">
        El informe personalizado aparecerá aquí.
      </div>
    );
  }

  const blocks = parseSimpleMarkdown(text);

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          return (
            <h3 key={i} className="text-base font-semibold text-ink pt-2 first:pt-0">
              {block.content as string}
            </h3>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} className="list-disc pl-5 space-y-1.5">
              {(block.content as string[]).map((item, j) => (
                <li key={j} className="text-[15px] text-ink-soft leading-relaxed">
                  <InlineText text={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-[15px] text-ink-soft leading-relaxed">
            <InlineText text={block.content as string} />
          </p>
        );
      })}
    </div>
  );
}
