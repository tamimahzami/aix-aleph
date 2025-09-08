type BoxProps = { className?: string; srLabel?: string };
export function SkeletonBox({ className = "", srLabel }: BoxProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-white/10 ${className}`}
      role={srLabel ? "status" : undefined}
      aria-live={srLabel ? "polite" : undefined}
      aria-label={srLabel}
    />
  );
}
export function SkeletonAvatar({ className = "w-12 h-12" }: { className?: string }) {
  return <div className={`animate-pulse rounded-full bg-white/10 ${className}`} />;
}
