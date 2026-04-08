import logo from './logo.svg';
import './App.css';

import { useState, useMemo } from "react";
import SimpleNumberInput from "./SimpleNumberInput";
import InputWithUnit from "./InputWithUnit";

function App() {
   const [field1, setField1] = useState("");
  const [area, setArea] = useState("");
  const [areaUnit, setAreaUnit] = useState("m²");

  const [amount, setAmount] = useState("");
  const [amountType, setAmountType] = useState("%");

  // ✅ calculation
  const result = useMemo(() => {
    const base = parseFloat(field1 || "0");
    const val = parseFloat(amount || "0");

    if (amountType === "%") {
      return (base * val) / 100;
    } else {
      return base + val;
    }
  }, [field1, amount, amountType]);

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      
      {/* FIELD 1 */}
      <h3>Field 1 (Base)</h3>
      <SimpleNumberInput value={field1} onChange={setField1} />
      <div style={{ fontSize: "12px", color: "gray" }}>
        Raw: {field1 || "0.00"}
      </div>

      {/* FIELD 2 */}
      <h3>Field 2 (Area)</h3>
      <InputWithUnit
        value={area}
        onChange={setArea}
        unit={areaUnit}
        setUnit={setAreaUnit}
        options={["m²", "cm²"]}
      />
      <div style={{ fontSize: "12px", color: "gray" }}>
        Raw: {area || "0.00"} {areaUnit}
      </div>

      {/* FIELD 3 */}
      <h3>Field 3 (Amount)</h3>
      <InputWithUnit
        value={amount}
        onChange={setAmount}
        unit={amountType}
        setUnit={setAmountType}
        options={["%", "€"]}
      />
      <div style={{ fontSize: "12px", color: "gray" }}>
        Raw: {amount || "0.00"} {amountType}
      </div>

      {/* RESULT */}
      <h3>Result</h3>
      <div
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          textAlign: "right",
          marginBottom: "5px",
        }}
      >
        {result.toLocaleString("de-DE", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>

      <div style={{ fontSize: "12px", color: "gray" }}>
        Raw Result: {result.toFixed(2)}
      </div>

      <h3>Formula</h3>
      if(Field 3 == % then : Result = Field 1 * Field 3 / 100) 
      <br/>
      if(Field 3 == € then : Result = Field 1 + Field 3 )
    </div>
  );
}

export default App;
