import { useState } from "react";

export default function DropDownLogic({
  data,
  selectHandler,
  name,
  id,
  value,
  level,
  label,
}) {
  return (
    <label>
      {label}
      <select
        name={name}
        id={id}
        value={value}
        onChange={(e) => selectHandler(e, level)}
      >
        <option key="0" value="none"></option>
        {data.map((item) => (
          <option id={item.id} key={item.id} value={item.id}>
            {item.category}
          </option>
        ))}
      </select>
    </label>
  );
}
