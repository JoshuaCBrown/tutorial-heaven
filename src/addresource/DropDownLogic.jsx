import { useState } from "react";

export default function DropDownLogic({
  data,
  selectHandler,
  name,
  id,
  value,
  level,
}) {
  return (
    <label>
      Parent Category:
      <select
        name={name}
        id={id}
        value={value}
        onChange={(e) => selectHandler(e, level)}
      >
        <option key="0" value="none"></option>
        {data.map((item) => (
          <option id={item.id} key={item.id} value={item.category}>
            {item.category}
          </option>
        ))}
      </select>
    </label>
  );
}
