import type { IconType } from "react-icons";

type AuthSocialButtonProps = {
  icon: IconType;
  isLoading?: boolean;
  onClick: () => void;
};

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  isLoading,
  onClick,
}) => {
  return (
    <button
      type="button"
      disabled={isLoading}
      aria-disabled={isLoading}
      onClick={onClick}
      className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
    >
      <Icon />
    </button>
  );
};

export default AuthSocialButton;
