import { Tag } from "./Tag";

interface Props {
  label: string;
  status: string;
  items: readonly { title: string; text: string }[];
  tags: readonly string[];
}

export function CurrentlyCard({ label, status, items, tags }: Props) {
  return (
    <aside
      aria-label={label}
      className="border-border bg-surface overflow-hidden rounded-[16px] border"
    >
      <div className="border-border flex items-center justify-between border-b px-[18px] py-3.5">
        <span className="label-mono">{label}</span>
        {status ? (
          <span className="text-muted inline-flex items-center gap-1.5 text-xs">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[#34d399]"
            />
            {status}
          </span>
        ) : null}
      </div>
      <div className="flex flex-col gap-[18px] px-[18px] py-5">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col gap-1">
            <span className="text-text text-[15px] font-semibold">
              {item.title}
            </span>
            {item.text ? (
              <span className="text-muted text-sm leading-normal">
                {item.text}
              </span>
            ) : null}
          </div>
        ))}
        {tags.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </aside>
  );
}
