import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center" | "right";
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  className,
  align = "center", // Default to center for marketing site
}) => {
  return (
    <div className={cn("mb-8", className,
      align === "center" && "text-center mx-auto max-w-2xl",
      align === "left" && "text-left",
      align === "right" && "text-right ml-auto max-w-2xl"
    )}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-lg text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;