import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-4",
        align === "center" && "mx-auto max-w-3xl text-center",
        className,
      )}
    >
      <p className="text-sm uppercase tracking-[0.35em] text-cyan/80">{eyebrow}</p>
      <div className="space-y-3">
        <h2 className="text-3xl leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
        <p className="max-w-2xl text-base text-muted/85 sm:text-lg">{description}</p>
      </div>
    </div>
  );
}
