import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "@/lib/store";
import UserInfoSkeleton from "./UserSkeletonInfo";
import dynamic from "next/dynamic";

const EditShippingInfo = dynamic(() => import("./EditShippingInfo"));
const EditUser = dynamic(() => import("./EditUser"));
const EditPassword = dynamic(() => import("./EditPassword"));
const CancelAccount = dynamic(() => import("./CancelAccount"));

export default function UserInfo() {
  const { user, loadingAuth } = useSelector((state: RootState) => state.auth);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showEditShippingModal, setShowEditShippingModal] = useState(false);
  const [showEditPasswordModal, setShowEditPasswordModal] = useState(false);
  const [showCancelAccount, setShowCancelAccount] = useState(false);

  if (loadingAuth || !user) {
    return <UserInfoSkeleton />;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Your Profile</h1>
      </div>
      <ul className="space-y-6">
        <li className="bg-gray-100 p-4 rounded">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Personal Info
            </h2>
            <button
              onClick={() => setShowEditUserModal(true)}
              className="px-3 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400"
            >
              Edit
            </button>
          </div>
          <div className="md:flex md:space-x-8">
            <div className="mb-4 md:mb-0 md:w-1/2">
              <p className="text-sm font-medium text-gray-700 mb-1">
                First Name
              </p>
              <p className="text-base font-normal text-gray-900">
                {user?.firstName}
              </p>
            </div>
            <div className="md:w-1/2">
              <p className="text-sm font-medium text-gray-700 mb-1">
                Last Name
              </p>
              <p className="text-base font-normal text-gray-900">
                {user?.lastName}
              </p>
            </div>
          </div>
        </li>

        <li className="bg-gray-100 p-4 rounded">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Shipping Information
            </h2>
            <button
              onClick={() => setShowEditShippingModal(true)}
              className="px-3 py-1 text-sm bg-gray-300 rounded hover:bg-gray-400"
            >
              {user?.shippingInfo?.address1 ? "Edit" : "Add"}
            </button>
          </div>

          {user?.shippingInfo ? (
            <div className="space-y-1">
              <p className="text-base font-normal text-gray-900">
                {user.shippingInfo.firstName} {user.shippingInfo.lastName}
              </p>
              <p className="text-base font-normal text-gray-900">
                {user.shippingInfo.address1}
              </p>
              {user.shippingInfo.address2 && (
                <p className="text-base font-normal text-gray-900">
                  {user.shippingInfo.address2}
                </p>
              )}
              <p className="text-base font-normal text-gray-900">
                {user.shippingInfo.townCity}, {user.shippingInfo.postcode}
              </p>
              <p className="text-base font-normal text-gray-900">
                {user.shippingInfo.country}
              </p>
            </div>
          ) : (
            <p className="text-base font-normal text-gray-900">
              No shipping information added
            </p>
          )}
        </li>

        <li className="bg-gray-100 p-4 rounded">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Password</h2>
            <button
              onClick={() => setShowEditPasswordModal(true)}
              className="text-sm underline text-gray-900"
            >
              Reset Password
            </button>
          </div>
        </li>

        <li className="bg-gray-100 p-4 rounded">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              Delete Account
            </h2>
            <button
              onClick={() => setShowCancelAccount(true)}
              className="text-sm underline text-gray-900"
            >
              Cancel Account
            </button>
          </div>
        </li>
      </ul>

      {showEditUserModal && (
        <EditUser user={user} onClose={() => setShowEditUserModal(false)} />
      )}

      {showCancelAccount && (
        <CancelAccount
          user={user}
          onClose={() => setShowCancelAccount(false)}
        />
      )}

      {showEditPasswordModal && (
        <EditPassword
          user={user}
          onClose={() => setShowEditPasswordModal(false)}
        />
      )}

      {showEditShippingModal && (
        <EditShippingInfo
          user={user}
          onClose={() => setShowEditShippingModal(false)}
        />
      )}
    </>
  );
}
