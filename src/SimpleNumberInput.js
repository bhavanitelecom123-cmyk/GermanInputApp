import { NumericFormat } from "react-number-format";

export default function SimpleNumberInput({ value, onChange }) {
  return (
    <NumericFormat
      value={value}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      fixedDecimalScale
      allowNegative={false}
      inputMode="decimal"
      placeholder="0,00"
      style={{ textAlign: "right" }}
      onValueChange={(values) => onChange?.(values.value)}
    />
  );
}