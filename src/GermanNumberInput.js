import { useState } from "react";
import { NumericFormat } from "react-number-format";

export default function GermanNumberInput({
  value,
  onChange,
  suffix = "",
  unit = "",
}) {
  const [isFocused, setIsFocused] = useState(false);

  const isEuro = unit === "€";

  return (
    <NumericFormat
      value={value}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={isEuro ? 0 : 2}
      fixedDecimalScale={!isFocused && !isEuro}
      allowNegative={false}
      inputMode="decimal"
      placeholder="0,00"
      suffix={suffix}
      style={{
        textAlign: "right",
        paddingRight: "10px",
      }}

      // ✅ value change
      onValueChange={(values) => {
        onChange?.(values.value); // raw value
      }}

      // ✅ focus
      onFocus={() => setIsFocused(true)}

      // ✅ blur handling
      onBlur={(e) => {
        setIsFocused(false);

        let val = e.target.value.replace(suffix, "").trim();

        if (!val || val === "") {
          onChange?.(isEuro ? "0" : "0.00");
          return;
        }

        if (!isEuro) {
          // ✅ % → keep 2 decimals
          if (!val.includes(",")) {
            val = val + ",00";
          } else {
            const [int, dec = ""] = val.split(",");
            val = int + "," + (dec + "00").slice(0, 2);
          }
        } else {
          // ✅ € → remove decimals
          val = val.split(",")[0];
        }

        const normalized = val
          .replace(/\./g, "")
          .replace(",", ".");

        onChange?.(normalized);
      }}

      // ✅ limit digits before decimal
      isAllowed={(values) => {
        const raw = values.value || "";
        const [integerPart] = raw.split(".");
        return integerPart.length <= 9;
      }}

      // ✅ key handling
      onKeyDown={(e) => {
        const input = e.target;
        const val = input.value;

        // ❌ block dot typing
        if (e.key === ".") {
          e.preventDefault();
          return;
        }

        // ❌ block comma for €
        if (isEuro && e.key === ",") {
          e.preventDefault();
          return;
        }

        // ❌ block second comma
        if (!isEuro && e.key === "," && val.includes(",")) {
          e.preventDefault();
        }

        // ✅ smooth LEFT navigation (skip dots)
        if (e.key === "ArrowLeft") {
          const pos = input.selectionStart;
          if (pos === 0) return;

          e.preventDefault();

          let newPos = pos - 1;

          while (newPos > 0 && val[newPos - 1] === ".") {
            newPos--;
          }

          input.setSelectionRange(newPos, newPos);
        }

        // ✅ prevent typing inside suffix
        const suffixIndex = val.indexOf(suffix);

        if (suffix && suffixIndex !== -1) {
          const cursor = input.selectionStart;

          if (cursor > suffixIndex) {
            e.preventDefault();
            input.setSelectionRange(suffixIndex, suffixIndex);
          }
        }
      }}
    />
  );
}