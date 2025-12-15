"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../../../lib/auth-context";
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import PageHeader from "@/components/SiteHeader";
import Button from "@/components/Button";

export default function ChangePassword() {
  const { user } = useUserAuth();
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const auth = getAuth();

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      setSuccess("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");

      setTimeout(() => router.push("/profile"), 1500);
    } catch (err) {
      console.error(err);

      if (err.code === "auth/wrong-password") {
        setError("Current password is incorrect.");
      } else if (err.code === "auth/weak-password") {
        setError("New password must be at least 6 characters.");
      } else {
        setError("Failed to update password. Please try again.");
      }
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen ">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/pic.png')" }}
      />
                  
      <div className="absolute inset-0 bg-black/60"></div>
      <PageHeader />

      <div className="relative z-10 max-w-md mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6 text-white">
          Change Password
        </h1>

        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}

          <div>
            <label className="font-semibold">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="font-semibold">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex gap-4">
            <Button
              text={loading ? "Updating..." : "Change Password"}
              onClick={handleChangePassword}
              disabled={loading}>
              Change Password
            </Button>
            <Button
              text="Cancel"
              variant="secondary"
              onClick={() => router.push("/profile")}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
