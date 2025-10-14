import { checkAuth } from "@/lib/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AuthChecker({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return <>{children}</>;
}
