import { cn } from "@/lib/utils";

export function DetailSection({
  id,
  title,
  children,
  className,
  aside,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  aside?: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-title` : undefined} className={cn("scroll-mt-28 border-t border-line pt-10", className)}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <h2 id={id ? `${id}-title` : undefined} className="text-2xl font-bold">
          {title}
        </h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

export function DemoNotice({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-line-strong bg-mist px-4 py-3 text-[13px] leading-relaxed text-body">{children}</p>
  );
}
