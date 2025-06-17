"use client";

import React, { useCallback } from "react";
import { Button } from "../ui/button";

type Props = {
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  disabled?: boolean;
  secondaryActionLabel?: string;
  secondaryAction?: () => void;
};

const Modal = ({
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryActionLabel,
  secondaryAction,
}: Props) => {
  const handleSubmit = useCallback(() => {
    if (disabled) return;
    if (onSubmit) {
      onSubmit();
    }
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (!secondaryAction) return;

    secondaryAction();
  }, [disabled, secondaryAction]);

  return (
    <>
      <div>
        <div className="translate relative flex h-full w-full flex-col rounded-lg border-0 bg-zinc-50 shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto">
          <div className="relative flex items-center justify-center rounded-t border-b-[1px] p-6">
            <div className="mx-auto text-center text-xl font-bold text-rose-500">
              {title}
            </div>
          </div>
          {/* BODY */}
          <div className="relative flex-auto p-6">{body}</div>
          {/* FOOTER */}
          <div className="flex flex-col gap-2 p-6">
            <div className="flex w-full items-center gap-4">
              <Button
                className="flex w-full items-center justify-center gap-3"
                onClick={handleSecondaryAction}
                disabled={!secondaryAction}
                variant={secondaryAction ? "secondary" : "ghost"}
              >
                {secondaryActionLabel}
              </Button>
              {actionLabel && (
                <Button
                  className="flex w-full items-center justify-center gap-3"
                  disabled={disabled}
                  onClick={handleSubmit}
                >
                  {actionLabel}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
