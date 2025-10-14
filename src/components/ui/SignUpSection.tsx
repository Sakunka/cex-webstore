import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/lib/features/auth/authSlice";
import Loader from "./Loader";
import { AppDispatch, RootState } from "@/lib/store";

type SignUpFormData = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
};

export default function SignUpSection() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.auth.loadingRegister);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const password = watch("password");

  function onSubmit(data: SignUpFormData) {
    if (data.password !== data.confirmPassword) {
      return alert(
        "You have to enter the password or the password was incorrect"
      );
    }

    dispatch(
      registerUser({
        email: data.emailAddress,
        lastName: data.lastName,
        firstName: data.firstName,
        password: data.password,
      })
    );
  }

  return (
    <>
      {loading ? (
        <Loader height={220} width={22} />
      ) : (
        <>
          <p className="pb-3">Already have an Account? Login here</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  {...register("firstName", {
                    required: "Morate unijeti ime",
                  })}
                  className="h-10 bg-[#f9f9f9] rounded-4xl pl-3"
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  {...register("lastName", {
                    required: "Morate unijeti prezime",
                  })}
                  className="h-10 bg-[#f9f9f9] rounded-4xl pl-3"
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2 col-span-2">
                <label htmlFor="emailAddress">Email Address</label>
                <input
                  id="emailAddress"
                  type="email"
                  {...register("emailAddress", {
                    required: "Morate unijeti email adresu",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Neispravna email adresa",
                    },
                  })}
                  className="h-10 bg-[#f9f9f9] rounded-4xl pl-3"
                  placeholder="Email address"
                />
                {errors.emailAddress && (
                  <p className="text-red-500 text-sm">
                    {errors.emailAddress.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  {...register("password", {
                    required: "Morate unijeti sifru",
                    minLength: {
                      value: 6,
                      message: "Sifra mora imati najmanje 6 karaktera",
                    },
                  })}
                  className="h-10 bg-[#f9f9f9] rounded-4xl pl-3"
                  placeholder="Password"
                  type="password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "You have to confirm the password",
                    validate: (value) =>
                      value === password || "Passwords are not equal",
                  })}
                  type="password"
                  className="h-10 bg-[#f9f9f9] rounded-4xl pl-3"
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col py-8 space-y-4">
              <div className="flex flex-row items-start gap-2">
                <input
                  id="agree"
                  type="checkbox"
                  {...register("agree", {
                    required: "Morate ovo potvrditi",
                  })}
                />
                <label htmlFor="agree" className="text-sm">
                  I confirm that I am 13 years of age or older and I accept the
                  Terms & Conditions and Privacy Policy
                </label>
              </div>
              {errors.agree && (
                <p className="text-red-500 text-sm">{errors.agree.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`bg-red-600 text-white rounded-4xl h-10 w-full hover:bg-red-700 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </>
      )}
    </>
  );
}
