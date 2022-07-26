import React from "react";
import { useNavigate } from "react-router";
import ScaleLoader from "react-spinners/ScaleLoader";

interface LoadableButtonProps {
  isLoading: boolean | undefined;
  disabled?: boolean;
  handleClick?: () => void;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  description?: string;
  className?: string;
  alertMessage?: string;
  spinnerColor?: string;
  fontColor?: string;
  navigate?: string;
}

export const LoadableButton: React.FC<LoadableButtonProps> = ({ ...props }) => {
  const navigation = useNavigate();
  const { navigate } = props;
  const {
    isLoading,
    description = "",
    type = "submit",
    className = "",
    alertMessage,
    spinnerColor,
    disabled = false,
    handleClick = () => {
      if (!navigate)
        return alert(
          "function is not implemented and navigation route not defined"
        );

      navigation(navigate);
    },
  } = props;

  return (
    <>
      <button
        className={
          className
            ? className
            : `cursor-pointer relative w-48 h-14 bg-blue-600 transform hover:bg-blue-500 hover:scale-105 transition-all duration-75 rounded-lg text-white flex justify-center flex-col text-xl border-blue-800 border-r-4 border-b-4`
        }
        onClick={() => handleClick()}
        type={type}
        disabled={isLoading || disabled}
      >
        <>
          {isLoading ? (
            <ScaleLoader
              color={spinnerColor ?? "white"}
              height={15}
              width={5}
            ></ScaleLoader>
          ) : (
            description
          )}
          {props.children}
        </>
      </button>
      {alertMessage && <div style={{ color: "red" }}>{alertMessage}</div>}
    </>
  );
};

export default LoadableButton;
