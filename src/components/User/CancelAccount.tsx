import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  shippingInfo: {
    firstName: string;
    lastName: string;
    organization: string;
    contactNumber: string;
    address1: string;
    address2: string;
    country: string;
    townCity: string;
    postcode: string;
  };
}

interface EditFormData {
  answer: number;
}

interface EditModalProps {
  user: User;
  onClose: () => void;
}

export default function CancelAccount({ user, onClose }: EditModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [first, setFirst] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);

  useEffect(() => {
    setFirst(Math.floor(Math.random() * 101));
    setSecond(Math.floor(Math.random() * 101));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<EditFormData>();

  async function uploadChanges(data: EditFormData) {
    setIsLoading(true);
    setError(null);

    if (Number(data.answer) !== first + second) {
      setError("Incorrect answer to the security question");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/auth/update/cancel/${user?._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to cancel user");
      }

      onClose();
      toast.success("Account has been successfully cancelled!");

      setTimeout(() => {
        router.push("/");
      }, 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Cancel Account</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(uploadChanges)} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="flex flex-row text-2xl gap-5">
            <div>{first}</div>
            <div>+</div>
            <div>{second}</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Answer
            </label>
            <input
              type="number"
              {...register("answer", {
                required: "You need to answer this question",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.answer && (
              <p className="text-red-500 text-sm mt-1">
                {errors.answer.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !isDirty}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
