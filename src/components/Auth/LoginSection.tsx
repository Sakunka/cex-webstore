import { loginUser } from "@/lib/features/auth/authSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import SignUpSection from "../ui/SignUpSection";
import Loader from "../ui/Loader";
import { toast } from "react-toastify";

type MyFormData = {
  emailAddress: string;
  password: string;
};

export default function LoginSection({
  setModal,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [sign, setSign] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { loadingLogin, error } = useSelector((state: RootState) => state.auth);

  function handleCreateAccount() {
    setSign((prev) => !prev);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyFormData>();

  const onSubmit = (data: MyFormData) => {
    dispatch(loginUser(data))
      .unwrap()
      .then((result) => {
        toast.success("Successfully signed in!");
      })
      .catch((error) => {
        toast.error(`Could not sign in`);
      });

    setModal((prev) => !prev);
  };

  const getErrorMessage = (error: any): string => {
    if (typeof error === "string") return error;
    if (typeof error === "object" && error !== null) {
      return error.message || "An error occurred";
    }
    return "An error occurred";
  };

  return (
    <>
      {sign ? (
        <SignUpSection />
      ) : loadingLogin ? (
        <Loader width={80} height={100} />
      ) : (
        <>
          <p className="mb-6">
            <span>Dont have an account?</span>
            <span
              onClick={() => handleCreateAccount()}
              className="underline cursor-pointer"
            >
              {" "}
              Create an Account
            </span>
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-3">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                className="h-10 bg-[#f9f9f9] rounded-4xl pl-3"
                placeholder="Email address"
                {...register("emailAddress", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.emailAddress && (
                <span className="text-red-500 text-sm">
                  {errors.emailAddress.message}
                </span>
              )}

              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="h-10 bg-[#f9f9f9] rounded-4xl pl-3"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {error && (
              <p className="text-red-500 text-sm py-2">
                {getErrorMessage(error)}
              </p>
            )}

            <p className="py-6">Forgot your password?</p>

            <button
              type="submit"
              disabled={loadingLogin}
              className="bg-red-600 text-white rounded-4xl h-10 w-full disabled:opacity-50"
            >
              {loadingLogin ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </>
      )}
    </>
  );
}
