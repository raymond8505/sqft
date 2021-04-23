import React from "react";
import { css } from "@emotion/css";

const pasteAreaCSS = css`
  width: 100%;
  height: 12em;
`;

interface PasteAreaProps {
  placeholder?: string;
  onChange: (a: string) => void;
  defaultValue?: string | number;
}
const PasteArea = ({ placeholder, onChange, defaultValue }: PasteAreaProps) => {
  const onFieldChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (onChange !== undefined) onChange(e.currentTarget.value);
  };
  return (
    <textarea
      className={pasteAreaCSS}
      placeholder={placeholder}
      onChange={onFieldChange}
      defaultValue={defaultValue}
    />
  );
};

export default PasteArea;
