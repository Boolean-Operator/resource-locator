type Props = { label: string; item: boolean | null };

export default function ServiceItem({ label, item }: Props) {
  return (
    <div>
      <span className={item ? "" : "text-slate-400 line-through"}>
        {label}: {item ? "Yes" : "No"}
      </span>
    </div>
  );
}
