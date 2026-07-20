import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-gray-300 transition-colors hover:border-indigo-500/40 hover:text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}
