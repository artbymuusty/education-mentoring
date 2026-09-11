export function SettingsField({
  id,
  label,
  defaultValue,
  type = "text",
  placeholder,
  helper,
  textarea = false,
}: {
  id: string;
  label: string;
  defaultValue?: string | null;
  type?: string;
  placeholder?: string;
  helper?: string;
  textarea?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          defaultValue={defaultValue ?? ""}
          placeholder={placeholder}
          rows={2}
          className="w-full rounded-[3px] border border-line bg-paper px-4 py-3 text-sm text-ink outline-none focus-visible:border-accent"
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          defaultValue={defaultValue ?? ""}
          placeholder={placeholder}
          className="w-full rounded-[3px] border border-line bg-paper px-4 py-3 text-sm text-ink outline-none focus-visible:border-accent"
        />
      )}
      {helper ? <p className="mt-1.5 text-xs text-muted">{helper}</p> : null}
    </div>
  );
}
