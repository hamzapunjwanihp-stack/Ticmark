import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
  action?: React.ReactNode;
  className?: string;
  id?: string;
}

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 font-display text-[12px] font-semibold uppercase tracking-[0.2em]",
        tone === "dark" ? "text-teal-ink" : "text-cyan",
        className,
      )}
    >
      <span className={cn("h-px w-7", tone === "dark" ? "bg-teal" : "bg-cyan")} aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  as: Tag = "h2",
  action,
  className,
  id,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        !centered && Boolean(action) && "md:flex-row md:items-end md:justify-between",
        centered && "items-center text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        {eyebrow && (
          <Eyebrow tone={tone} className={cn("mb-4", centered && "justify-center")}>
            {eyebrow}
          </Eyebrow>
        )}
        <Tag
          id={id}
          className={cn("text-[1.9rem] font-bold leading-[1.12] sm:text-[2.35rem] lg:text-[2.6rem]", tone === "light" && "text-white")}
        >
          {title}
        </Tag>
        {description && (
          <p className={cn("mt-4 text-base leading-relaxed sm:text-[17px]", tone === "light" ? "text-white/70" : "text-body")}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
