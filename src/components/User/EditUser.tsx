import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";

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
  firstName: string;
  lastName: string;
}

interface EditModalProps {
  user: User;
  onClose: () => void;
}

export default function EditUser({ user, onClose }: EditModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<EditFormData>({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
    },
  });

  async function uploadChanges(data: EditFormData) {
    setIsLoading(true);
    setError(null);

    console.log("User ID:", user?._id);
    console.log("Sending to:", `/api/update/${user?._id}`);

    try {
      const response = await fetch(`/api/auth/update/${user?._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Response:", response, response.status);

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      onClose();
      toast.success("Profile updated successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              {...register("firstName", {
                required: "First name is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              {...register("lastName", {
                required: "Last name is required",
                minLength: { value: 2, message: "Minimum 2 characters" },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
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
