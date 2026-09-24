import Link from "next/link";
import { isExternalHref } from "@/lib/contact";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "accent" | "outline" | "ghost" | "light" | "outline-light" | "whatsapp";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex shrink-0 items-center justify-center gap-2 rounded-xl font-display font-semibold tracking-[-0.01em] transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-[var(--ease-premium)] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-navy text-white hover:bg-ink shadow-[0_8px_20px_-12px_rgb(32_36_76/0.6)]",
  accent: "bg-cyan text-ink hover:bg-[#4bb3e0] shadow-[0_8px_20px_-12px_rgb(52_164_214/0.7)]",
  outline: "border border-line-strong bg-white text-ink hover:border-ink",
  ghost: "text-ink hover:bg-mist",
  light: "bg-white text-ink hover:bg-cyan-50",
  "outline-light": "border border-white/35 text-white hover:border-white hover:bg-white/10",
  whatsapp: "bg-whatsapp text-white hover:bg-[#188a49]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-[13px]",
  md: "h-12 px-5 text-sm",
  lg: "h-14 px-7 text-[15px]",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function ButtonLink({ href, variant, size, className, children, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses(variant, size, className);
  if (isExternalHref(href)) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={classes} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ variant, size, className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...rest} />;
}

/** Link that inherits the surrounding text style with an animated underline. */
export function TextLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={cn("group/link inline-flex items-center gap-1.5 font-display text-sm font-semibold text-ink", className)}>
      <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover/link:bg-[length:100%_1px]">
        {children}
      </span>
    </Link>
  );
}
