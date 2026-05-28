"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useFormStatus } from "react-dom";

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
  const { pending } = useFormStatus();

  return (
    <button
      {...props}
      type={type}
      disabled={pending || props.disabled}
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
      {pending ? "Traitement..." : children}
    </button>
  );
}
