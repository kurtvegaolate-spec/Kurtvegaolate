import type { DiagnosticState } from "@/types";

/**
 * Codifica el estado del diagnóstico (empresa + respuestas) en la URL
 * como base64. No hay backend con base de datos: el link ES el estado.
 * Quien lo abre recalcula el puntaje al instante y se regenera el informe.
 */
export function encodeStateToHash(state: DiagnosticState): string {
  const json = JSON.stringify(state);
  const base64 = btoa(unescape(encodeURIComponent(json)));
  return `#/r/${base64}`;
}

export function decodeStateFromHash(hash: string): DiagnosticState | null {
  const match = hash.match(/^#\/r\/(.+)$/);
  if (!match) return null;
  try {
    const json = decodeURIComponent(escape(atob(match[1])));
    return JSON.parse(json) as DiagnosticState;
  } catch {
    return null;
  }
}

export function buildShareUrl(state: DiagnosticState): string {
  const origin = window.location.origin + window.location.pathname;
  return origin + encodeStateToHash(state);
}
