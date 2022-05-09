import React, { FC, useState } from "react";
import ContentHeader from "./ContentHeader";

interface ConvertContentProp {
  value: string;
  handler: (value: string) => void;
  result: string;
  hasError: boolean;
  selectedCur: string;
}

const ConvertContent: FC<ConvertContentProp> = ({
  value,
  handler,
  result,
  hasError,
  selectedCur,
}) => {
  const [blur, setBlur] = useState(false);

  const hendleBlur = () => {
    setBlur(true);
  };

  return (
    <div className="currency-convert">
      <div className="convert-content">
        <ContentHeader content="onlile currency converter" />
        <input
          name="conver"
          value={value}
          placeholder="15 usd in uah"
          className={`convert-input ${blur && hasError ? "errore" : ""}`}
          onChange={(e) => handler(e.target.value)}
          onBlur={hendleBlur}
        />
        {blur && hasError && (
          <span className="error-text">
            Invalid values. Try to type this: "15 usd in uah".
          </span>
        )}
      </div>
      <div className="convert-result">
        <span className="convert-result-text">
          {result || `0 ${selectedCur}`}
        </span>
      </div>
    </div>
  );
};

export default ConvertContent;
