import GermanNumberInput from "./GermanNumberInput";

export default function InputWithUnit({
  value,
  onChange,
  unit,
  setUnit,
  options,
}) {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <div style={{ flex: 1 }}>
        <GermanNumberInput
            value={value}
            onChange={onChange}
            suffix={` ${unit}`}
            unit={unit}   // ✅ NEW
            />
      </div>

      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}