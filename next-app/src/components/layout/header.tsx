import { UserStore } from "@/store/user.store";
import { Button } from "antd";
import { useRouter } from "next/router";
import { FC } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface IProps {
  title: string;
  backable?: boolean;
  backRoute?: string;
  hideAuthSection?: boolean;
}

const Header: FC<IProps> = ({
  title,
  backable,
  backRoute,
  hideAuthSection,
}: IProps) => {
  const { username, isLoggedIn, clearUser } = UserStore();
  const router = useRouter();

  const handleBack = () => {
    if (backRoute) {
      return router.replace(backRoute);
    }
    return router.back();
  };

  const handleLogout = () => {
    router.push("/login");
    clearUser();
  };

  return (
    <>
      <div className="w-full flex justify-between items-center p-4 shadow shadow-zinc-500">
        <div className="flex items-center">
          {backable && (
            <AiOutlineArrowLeft
              className="mr-4 cursor-pointer"
              size={18}
              onClick={handleBack}
            />
          )}
          <div className="text-xl font-bold mr-4">{title}</div>
        </div>

        {!hideAuthSection && (
          <div className="flex items-center">
            <div className="text-lg mr-4">
              Hi, <b>{username()}</b>
            </div>
            {isLoggedIn() ? (
              <>
                <Button
                  className="w-20"
                  type="default"
                  onClick={() => handleLogout()}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="w-20"
                  type="primary"
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
