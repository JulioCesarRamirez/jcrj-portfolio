/** Rendered only in `next dev`. Production builds never include it. */
export function DraftBanner() {
  return (
    <div
      role="status"
      className="bg-[#fde047] px-5 py-2 text-center text-sm font-medium text-[#18181b]"
    >
      Draft preview: unpublished entries and TODO(julio) text are shown.
      Production builds hide them.
    </div>
  );
}
