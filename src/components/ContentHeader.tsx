import React, { FC } from "react";

interface ContentHeaderProp {
  content: string;
}

const ContentHeader: FC<ContentHeaderProp> = ({ content }) => {
  return (
    <>
      <h2 className="convert-header">{content.toUpperCase()}</h2>
      <p className="convert-text">
        Fast, simplle, non-custodial Exchange Service. Check live foreign
        currency exchange rates
      </p>
    </>
  );
};

export default ContentHeader;
