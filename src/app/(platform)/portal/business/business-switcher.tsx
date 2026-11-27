"use client";

import { useState, useTransition } from "react";
import { RiBuilding2Line, RiCheckLine, RiExpandUpDownLine, RiStackLine } from "@remixicon/react";
import { Dropdown, DropdownDivider, DropdownGroup, DropdownItem, DropdownPopover, DropdownTrigger } from "@/components/base/dropdown/dropdown";
import { ACCESS_LABEL, type ContactAccess } from "@/lib/contacts/access";
import { cx } from "@/utils/cx";
import { switchBusinessAction } from "./actions";
import { ALL_BUSINESSES } from "./constants";

export interface SwitcherBusiness {
  id: string;
  name: string;
  access: ContactAccess;
}

/**
 * The portal header's "Switch business": every business this contact is linked to, and
 * All businesses. Hidden for a contact with one business. The choice is remembered.
 */
export function BusinessSwitcher({ businesses, activeId }: { businesses: SwitcherBusiness[]; activeId: string | null }) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  if (businesses.length < 2) return null;
  const active = businesses.find((b) => b.id === activeId) ?? null;
  const choose = (id: string) => {
    setOpen(false);
    setError(null);
    start(async () => {
      const r = await switchBusinessAction(id);
      if (r.error) setError(r.error);
    });
  };

  return (
    <div className="min-w-0">
      <Dropdown isOpen={open} onOpenChange={setOpen}>
        <DropdownTrigger
          aria-label={`Switch business. Now showing ${active ? active.name : "all businesses"}`}
          className={cx(
            "flex h-9 max-w-full min-w-0 items-center gap-2 rounded-xl border border-border-button-default bg-background-primary-default ps-2.5 pe-2 text-start transition-colors hover:border-border-button-hover hover:bg-background-secondary-hover pointer-coarse:min-h-11",
            pending && "opacity-60",
          )}
        >
          {active ? <RiBuilding2Line aria-hidden className="size-4 shrink-0 text-foreground-icon-secondary" /> : <RiStackLine aria-hidden className="size-4 shrink-0 text-foreground-icon-secondary" />}
          <span className="min-w-0 truncate text-body-medium text-text-primary">{active ? active.name : "All businesses"}</span>
          <RiExpandUpDownLine aria-hidden className="size-4 shrink-0 text-foreground-icon-tertiary" />
        </DropdownTrigger>
        <DropdownPopover aria-label="Your businesses" placement="bottom start" className="w-72">
          <DropdownGroup label="Your businesses">
            {businesses.map((b) => (
              <DropdownItem key={b.id} selected={b.id === activeId} onSelect={() => choose(b.id)}>
                <RiBuilding2Line aria-hidden className="size-4 shrink-0 text-foreground-icon-secondary" />
                <span className="flex min-w-0 flex-1 flex-col text-start">
                  <span className="truncate text-body-medium text-text-primary">{b.name}</span>
                  <span className="text-caption-1-regular text-text-tertiary">{ACCESS_LABEL[b.access]}</span>
                </span>
                {b.id === activeId && <RiCheckLine aria-hidden className="size-4 shrink-0 text-foreground-icon-primary" />}
              </DropdownItem>
            ))}
          </DropdownGroup>
          <DropdownDivider />
          <DropdownItem selected={activeId === null} onSelect={() => choose(ALL_BUSINESSES)}>
            <RiStackLine aria-hidden className="size-4 shrink-0 text-foreground-icon-secondary" />
            <span className="flex-1 text-start text-body-medium text-text-primary">All businesses</span>
            {activeId === null && <RiCheckLine aria-hidden className="size-4 shrink-0 text-foreground-icon-primary" />}
          </DropdownItem>
        </DropdownPopover>
      </Dropdown>
      {error && <p role="alert" className="mt-1 text-caption-1-regular text-text-error-primary">{error}</p>}
    </div>
  );
}
