"use client";

import { useId, useState } from "react";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Select, SelectItem } from "@/components/base/select/select";
import { QUOTE_LABEL } from "@/lib/site/config";
import {
  INDUSTRIES,
  PICKER_TAXPAYER_TYPES,
  TAX_CHOICES,
  startHref,
  type IndustryId,
  type PickerService,
  type PickerTaxpayerType,
  type TaxChoice,
} from "@/lib/site/intake";
import { CtaLink } from "./cta-link";

/**
 * "Tell us about your business": industry, taxpayer type and the tax types on the
 * prospect's Certificate of Registration. "Get a quote" opens /start with these as
 * query parameters (plus utm/ref, by CtaLink), where they become default values.
 * While the funnel is closed the button goes to the contact page instead.
 */
export function IntakePicker({ service, toFunnel, fallbackHref }: { service: PickerService | null; toFunnel: boolean; fallbackHref: string }) {
  const [industry, setIndustry] = useState<IndustryId | null>(null);
  const [taxpayerType, setTaxpayerType] = useState<PickerTaxpayerType | null>(null);
  const [taxes, setTaxes] = useState<TaxChoice[]>([]);
  const legend = useId();

  const toggle = (id: TaxChoice, on: boolean) =>
    setTaxes((prev) => {
      const rest = prev.filter((t) => t !== id && !(on && ((id === "vat" && t === "pt") || (id === "pt" && t === "vat"))));
      return on ? [...rest, id] : rest;
    });

  const href = toFunnel ? startHref({ industry, taxpayerType, taxes, service }) : fallbackHref;

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Industry"
          placeholder="Choose one"
          selectedKey={industry}
          onSelectionChange={(k) => setIndustry((k as IndustryId) ?? null)}
          triggerClassName="h-11"
        >
          {INDUSTRIES.map((i) => (
            <SelectItem key={i.id} id={i.id}>
              {i.label}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Registered as"
          placeholder="Choose one"
          selectedKey={taxpayerType}
          onSelectionChange={(k) => setTaxpayerType((k as PickerTaxpayerType) ?? null)}
          triggerClassName="h-11"
        >
          {PICKER_TAXPAYER_TYPES.map((t) => (
            <SelectItem key={t.id} id={t.id}>
              {t.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div role="group" aria-labelledby={legend} className="flex flex-col gap-3">
        <p id={legend} className="text-body-medium text-text-primary">
          Tax types on your COR
        </p>
        <div className="grid grid-cols-1 gap-y-3">
          {TAX_CHOICES.map((t) => (
            <Checkbox key={t.id} isSelected={taxes.includes(t.id)} onChange={(on) => toggle(t.id, on)} className="min-h-6">
              {t.label} <span className="figure text-text-secondary">({t.form})</span>
            </Checkbox>
          ))}
        </div>
      </div>
      <div>
        <CtaLink href={href} className="h-12 px-5">
          {QUOTE_LABEL}
        </CtaLink>
      </div>
    </div>
  );
}
