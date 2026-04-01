interface PlaceholderScreenProps {
  title: string
  description: string
}

export function PlaceholderScreen({
  title,
  description,
}: PlaceholderScreenProps) {
  return (
    <div className="flex min-h-full items-start justify-center px-4 py-6 sm:px-5">
      <section className="w-full rounded-[14px] border border-[#e4e4e7] bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.04)]">
        <div className="max-w-2xl">
          <div className="inline-flex rounded-[8px] border border-[rgba(87,54,243,0.18)] bg-[rgba(87,54,243,0.08)] px-2.5 py-1 text-xs font-medium text-[rgba(87,54,243,0.92)]">
            Simulated app area
          </div>
          <h2 className="mt-4 text-[28px] font-semibold tracking-[-0.04em] text-[#18181b]">
            {title}
          </h2>
          <p className="mt-2 max-w-xl text-sm text-[#71717b]">{description}</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[10px] border border-dashed border-[#d4d4d8] bg-[#fafafa] p-4"
            >
              <div className="h-2 w-20 rounded-full bg-[#e4e4e7]" />
              <div className="mt-4 h-20 rounded-[8px] bg-[#f4f4f5]" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
