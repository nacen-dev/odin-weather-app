import React from "react";

type Props = {
  className?: string;
};

const Footer = ({className}: Props) => {
  return (
    <footer className={className ? className : ""}>
      <p>
        Photo by{" "}
        <a href="https://unsplash.com/@jmsdono?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          James Donovan
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/@jmsdono?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash
        </a>
      </p>
    </footer>
  );
};

export { Footer };
