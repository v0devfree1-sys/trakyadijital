// DijiTrak logosu — yalnızca wordmark: DİJİTRAK
export default function Logo({ size = "md", showTagline = true }) {
  const wordSize = size === "sm" ? "text-sm" : size === "lg" ? "text-xl sm:text-2xl" : "text-lg sm:text-xl";

  return (
    <span className="flex items-center select-none">
      <span className="flex flex-col leading-none">
        <span className={`font-heading font-extrabold tracking-tight ${wordSize}`}>
          DİJİ<span className="text-primary">TRAK</span>
        </span>
        {showTagline && (
          <span
            className={`${
              size === "sm" ? "hidden" : "hidden md:block"
            } font-mono text-[8px] tracking-[0.35em] text-muted-foreground mt-1`}
          >
            TEKNOLOJİYLE DAİMA İLERİ
          </span>
        )}
      </span>
    </span>
  );
}