import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { updateUserShippingInfo } from "@/lib/features/auth/authSlice";
import CountryList from "@/constants/countryList";

export default function EditShippingInfo({ user, onClose }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      organization: user?.shippingInfo?.organization || "",
      contactNumber: user?.shippingInfo?.contactNumber || "",
      address1: user?.shippingInfo?.address1 || "",
      address2: user?.shippingInfo?.address2 || "",
      country: user?.shippingInfo?.country || "",
      townCity: user?.shippingInfo?.townCity || "",
      postcode: user?.shippingInfo?.postcode || "",
    },
  });

  async function uploadChanges(data: any) {
    try {
      setIsLoading(true);
      setError(null);

      const result = await dispatch(
        updateUserShippingInfo({
          userId: user._id,
          shippingData: {
            organization: data.organization,
            contactNumber: data.contactNumber,
            address1: data.address1,
            address2: data.address2,
            country: data.country,
            townCity: data.townCity,
            postcode: data.postcode,
          },
        })
      ).unwrap();

      toast.success("Shipping info updated successfully!");
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
      toast.error("Failed to update shipping info");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Shipping Info</h2>
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
              Organization (Optional)
            </label>
            <input
              type="text"
              {...register("organization")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Company name (optional)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact Number *
            </label>
            <input
              type="tel"
              {...register("contactNumber", {
                required: "Contact number is required",
                pattern: {
                  value: /^[\+]?[0-9\s\-\(\)]+$/,
                  message: "Invalid phone number format",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+44 20 1234 5678"
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.contactNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 1 *
            </label>
            <input
              type="text"
              {...register("address1", {
                required: "Address is required",
                minLength: { value: 5, message: "Address too short" },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Street address, P.O. box"
            />
            {errors.address1 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address1.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address Line 2 (Optional)
            </label>
            <input
              type="text"
              {...register("address2")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Apartment, suite, unit, building, floor, etc."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Town/City *
              </label>
              <input
                type="text"
                {...register("townCity", {
                  required: "Town/City is required",
                  minLength: { value: 2, message: "Too short" },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City / Town"
              />
              {errors.townCity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.townCity.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postcode *
              </label>
              <input
                type="text"
                {...register("postcode", {
                  required: "Postcode is required",
                  pattern: {
                    value: /^[A-Z0-9\s\-]+$/i,
                    message: "Invalid postcode format",
                  },
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Example: 81000"
              />
              {errors.postcode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.postcode.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <select
              {...register("country", {
                required: "Country is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <CountryList />
            </select>
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.country.message}
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
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
