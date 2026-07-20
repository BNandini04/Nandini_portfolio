import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[#4F46E5] text-white shadow-[0_0_28px_-6px_rgba(79,70,229,0.7)] hover:bg-[#4338CA] hover:shadow-[0_0_40px_-4px_rgba(79,70,229,0.85)]",
        secondary:
          "glass text-gray-100 hover:border-white/20 hover:bg-white/[0.08]",
        ghost: "text-gray-400 hover:bg-white/5 hover:text-white",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-13 px-8 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export interface ButtonLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

export function ButtonLink({ className, variant, size, ...props }: ButtonLinkProps) {
  return <a className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
