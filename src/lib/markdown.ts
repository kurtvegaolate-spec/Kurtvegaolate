/**
 * Parser de markdown minimalista, solo para el texto que devuelve la API de Claude.
 * Soporta: ## encabezados, **negrita**, listas con "- " y párrafos. Nada más:
 * el informe se pide en un formato controlado, así que no hace falta una
 * librería de markdown completa.
 */
export interface MarkdownBlock {
  type: "heading" | "paragraph" | "list";
  content: string | string[];
}

export function parseSimpleMarkdown(text: string): MarkdownBlock[] {
  const lines = text.split("\n").map((l) => l.trim());
  const blocks: MarkdownBlock[] = [];
  let currentList: string[] = [];

  function flushList() {
    if (currentList.length > 0) {
      blocks.push({ type: "list", content: currentList });
      currentList = [];
    }
  }

  for (const line of lines) {
    if (line === "") {
      flushList();
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      blocks.push({ type: "heading", content: line.slice(3) });
    } else if (line.startsWith("- ")) {
      currentList.push(line.slice(2));
    } else {
      flushList();
      blocks.push({ type: "paragraph", content: line });
    }
  }
  flushList();
  return blocks;
}

export function renderInlineBold(text: string): { text: string; bold: boolean }[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((part) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return { text: part.slice(2, -2), bold: true };
    }
    return { text: part, bold: false };
  });
}
