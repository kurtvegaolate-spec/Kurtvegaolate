import { useState } from "react";
import type { IntakeData } from "@/types";
import { industryLabels, companySizeLabels } from "@/config/questions";

interface IntakeFormProps {
  onSubmit: (data: IntakeData) => void;
}

export function IntakeForm({ onSubmit }: IntakeFormProps) {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState<IntakeData["industry"] | "">("");
  const [companySize, setCompanySize] = useState<IntakeData["companySize"] | "">("");
  const [respondentRole, setRespondentRole] = useState("");

  const isValid = companyName.trim().length > 1 && industry && companySize;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({
      companyName: companyName.trim(),
      industry: industry as IntakeData["industry"],
      companySize: companySize as IntakeData["companySize"],
      respondentRole: respondentRole.trim(),
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-ink-soft mb-2">
          Nombre de la empresa
        </label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Ej. Comercial Andina S.A."
          className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-ink-soft mb-2">Industria</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value as IntakeData["industry"])}
            className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
            required
          >
            <option value="" disabled>
              Seleccionar
            </option>
            {Object.entries(industryLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-soft mb-2">
            Tamaño de la empresa
          </label>
          <select
            value={companySize}
            onChange={(e) => setCompanySize(e.target.value as IntakeData["companySize"])}
            className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-ink focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
            required
          >
            <option value="" disabled>
              Seleccionar
            </option>
            {Object.entries(companySizeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink-soft mb-2">
          Su cargo <span className="text-ink-faint font-normal">(opcional)</span>
        </label>
        <input
          type="text"
          value={respondentRole}
          onChange={(e) => setRespondentRole(e.target.value)}
          placeholder="Ej. Gerente de Operaciones"
          className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition"
        />
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="w-full md:w-auto inline-flex items-center justify-center rounded-lg bg-accent px-8 py-3.5 text-white font-medium hover:bg-accent-dark disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Comenzar diagnóstico
      </button>
    </form>
  );
}
