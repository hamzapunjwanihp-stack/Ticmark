export function OnThisPage({ links }: { links: Array<{ id: string; label: string }> }) {
  return (
    <nav aria-label="On this page" className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <ul className="flex gap-2">
        {links.map((l) => (
          <li key={l.id}>
            <a
              href={`#${l.id}`}
              className="inline-flex h-10 items-center whitespace-nowrap rounded-full border border-line px-4 font-display text-[13px] font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
