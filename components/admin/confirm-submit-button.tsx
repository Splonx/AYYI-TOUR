"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ConfirmSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  message: string;
};

export function ConfirmSubmitButton({
  children,
  message,
  onClick,
  type = "submit",
  ...props
}: ConfirmSubmitButtonProps) {
  return (
    <button
      {...props}
      type={type}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        if (!window.confirm(message)) {
          event.preventDefault();
        }
      }}
    >
      {children}
    </button>
  );
}
