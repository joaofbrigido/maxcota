import React from "react";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

type buttonProps = {
  className?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "success"
    | null
    | undefined;
  onclick?: () => void | Promise<void> | Promise<boolean>;
  //   disabled?: boolean;
  //   type?: "button" | "submit" | "reset";
};

export const CustomButton = ({
  className,
  isLoading,
  children,
  disabled,
  variant,
  onclick,
}: buttonProps) => {
  return (
    <>
      {isLoading ? (
        <Button className={`${className}`} disabled>
          <Loader className="animate-spin mr-3" />
          Carregando...
        </Button>
      ) : (
        <Button
          className={`${className}`}
          variant={variant}
          onClick={onclick}
          disabled={disabled}
        >
          {children}
        </Button>
      )}
    </>
  );
};
