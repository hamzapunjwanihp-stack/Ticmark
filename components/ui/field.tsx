import { cn } from "@/lib/utils";

export const controlClasses =
  "h-12 w-full rounded-xl border border-line-strong bg-white px-4 text-[15px] text-ink placeholder:text-subtle transition-[border-color,box-shadow] duration-200 hover:border-subtle focus:border-teal focus:outline-none focus:ring-4 focus:ring-cyan/15 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500/10";

export function FieldLabel({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block font-display text-[13px] font-semibold text-ink">
      {children}
      {optional && <span className="ml-1 font-normal text-subtle">(optional)</span>}
    </label>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  wrapperClassName?: string;
}

export function SelectField({ label, id, options, placeholder = "Any", wrapperClassName, className, ...rest }: SelectProps) {
  const selectId = id ?? rest.name ?? label;
  return (
    <div className={wrapperClassName}>
      {label && <FieldLabel htmlFor={selectId!}>{label}</FieldLabel>}
      <select id={selectId} className={cn(controlClasses, "select-chevron cursor-pointer pr-10", className)} {...rest}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-[13px] font-medium text-red-600">
      {message}
    </p>
  );
}
