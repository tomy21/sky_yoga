"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";
import { useCreateUser, UserPayloadCreate } from "@/hooks/useUsers";
// import toast from "react-hot-toast";

const RegisterCustomerPage = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [agree, setAgree] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emergencyContactError, setEmergencyContactError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [agreeError, setAgreeError] = useState("");

  const createUser = useCreateUser();

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const isValidEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidPhone = (phone: string) => {
    const plainPhone = phone.replace(/\D/g, ""); // Hilangkan semua non-digit
    return plainPhone.length > 0 && plainPhone.length <= 16;
  };
  const isValidEmergencyPhone = (emergencyContact: string) => {
    const plainPhone = emergencyContact.replace(/\D/g, ""); // Hilangkan semua non-digit
    return plainPhone.length > 0 && plainPhone.length <= 16;
  };

  const formatPhone = (phone: string) => {
    const plainPhone = phone.replace(/\D/g, ""); // remove non-numeric
    return `+62${plainPhone.replace(/^0+/, "")}`; // remove leading zero
  };

  const handleEmailBlur = () => {
    if (!isValidEmail(email)) {
      setEmailError("Email tidak valid.");
    } else if (email === "") {
      setEmailError("Email tidak boleh kosong.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = () => {
    if (password.length <= 8) {
      setPasswordError("Password tidak boleh kurang dari 8 karakter.");
    } else if (password === "") {
      setPasswordError("Password tidak boleh kosong.");
    } else {
      setPasswordError("");
    }
  };

  const handlePhoneBlur = () => {
    if (!isValidPhone(phone)) {
      setPhoneError("Nomor HP tidak valid. Maks. 16 digit.");
    } else if (phone === "") {
      setPhoneError("No Telepone tidak boleh kosong.");
    } else {
      setPhoneError("");
    }
  };
  const handleEmergencyPhoneBlur = () => {
    if (!isValidEmergencyPhone(emergencyContact)) {
      setEmergencyContactError("Nomor HP tidak valid. Maks. 16 digit.");
    } else if (phone === emergencyContact) {
      setEmergencyContactError("Emergency tidak boleh sama dengan no telepon.");
    } else {
      setEmergencyContactError("");
    }
  };

  const handleAddressBlur = () => {
    if (address.length <= 4) {
      setAddressError("Alamat tidak boleh kurang dari 5 karakter.");
    } else if (address === "") {
      setAddressError("Alamat tidak boleh kosong.");
    } else {
      setEmergencyContactError("");
    }
  };

  const handleFullnameBlur = () => {
    if (fullname.length <= 4) {
      setFullnameError("Fullname tidak boleh kurang dari 5 karakter.");
    } else if (fullname === "") {
      setFullnameError("Fullname tidak boleh kosong.");
    } else {
      setEmergencyContactError("");
    }
  };
  const handleUsernameBlur = () => {
    if (username.length <= 4) {
      setUsernameError("Username tidak boleh kurang dari 5 karakter.");
    } else if (username === "") {
      setUsernameError("Fullname tidak boleh kosong.");
    } else {
      setUsernameError("");
    }
  };

  const handleAgreeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAgree(checked);
    if (!checked) {
      setAgreeError("Anda harus menyetujui syarat & ketentuan.");
    } else {
      setAgreeError("");
    }
  };

  const validate = () => {
    if (!isValidEmail(email)) {
      setEmailError("Email tidak valid.");
      return false;
    }
    if (!isValidPhone(phone)) {
      setPhoneError("Nomor HP tidak valid. Maks. 16 digit.");
      return false;
    }
    if (!isValidPhone(emergencyContact)) {
      setEmergencyContactError("Nomor HP tidak valid. Maks. 16 digit.");
      return false;
    }
    if (!agree) {
      setAgreeError("Anda harus menyetujui syarat & ketentuan.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const payload: UserPayloadCreate = {
      username,
      email,
      phone: formatPhone(phone),
      password,
      roleMasterId: 3,
      status: "ACTIVE",
      userDetail: {
        fullName: fullname,
        nickName: username,
        email,
        address,
        emergencyContact,
        agree,
      },
    };

    setIsLoading(true);
    createUser.mutate(payload, {
      onSuccess: () => {
        setShowSuccessModal(true);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      },
      onError: () => {
        setIsLoading(false);
        alert("Gagal mendaftar. Silakan coba lagi.");
      },
    });
  };

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-5 shadow-lg">
        <h1 className="mb-8 text-center text-2xl font-semibold text-slate-600">
          Register New Member
        </h1>

        <div className="my-3 w-full border border-slate-300"></div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Account Info */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Informasi Akun
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    if (usernameError) {
                      setUsernameError("");
                    }
                  }}
                  onBlur={handleUsernameBlur}
                  required
                />
                {usernameError && (
                  <p className="mt-1 text-sm text-red-500">{usernameError}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  className={`w-full border ${emailError ? "border-red-500" : "border-gray-300"} rounded-lg px-4 py-3 transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) {
                      setEmailError("");
                    }
                  }}
                  onBlur={handleEmailBlur}
                  required
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-500">{emailError}</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) {
                      setPasswordError("");
                    }
                  }}
                  onBlur={handlePasswordBlur}
                  required
                />
                {passwordError && (
                  <p className="mt-1 text-sm text-red-500">{passwordError}</p>
                )}
              </div>
            </div>
          </div>

          {/* Customer Detail */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Detail Customer
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={fullname}
                  onChange={(e) => {
                    setFullname(e.target.value);
                    if (fullnameError) {
                      setFullnameError("");
                    }
                  }}
                  onBlur={handleFullnameBlur}
                  required
                />
                {fullnameError && (
                  <p className="mt-1 text-sm text-red-500">{fullnameError}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Phone
                </label>
                <div className="flex">
                  <span className="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 px-3 text-sm text-gray-700">
                    +62
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={16}
                    className={`w-full rounded-r-lg border border-gray-300 px-4 py-3 transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                      phoneError ? "border-red-500" : ""
                    }`}
                    value={phone}
                    onChange={(e) => {
                      const onlyNums = e.target.value.replace(/\D/g, ""); // remove non-numeric
                      setPhone(onlyNums);
                      if (phoneError) {
                        setPhoneError("");
                      }
                    }}
                    onBlur={handlePhoneBlur}
                    required
                  />
                </div>
                {phoneError && (
                  <p className="mt-1 text-sm text-red-500">{phoneError}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">
                  Emergency Contact
                </label>
                <div className="flex">
                  <span className="inline-flex items-center rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 px-3 text-sm text-gray-700">
                    +62
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={16}
                    className={`w-full rounded-r-lg border border-gray-300 px-4 py-3 transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none ${
                      emergencyContactError ? "border-red-500" : ""
                    }`}
                    value={emergencyContact}
                    onChange={(e) => {
                      const onlyNums = e.target.value.replace(/\D/g, ""); // remove non-numeric
                      setEmergencyContact(onlyNums);
                      if (emergencyContactError) {
                        setEmergencyContactError("");
                      }
                    }}
                    onBlur={handleEmergencyPhoneBlur}
                    required
                  />
                </div>
                {emergencyContactError && (
                  <p className="mt-1 text-sm text-red-500">
                    {emergencyContactError}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-gray-600">
                  Address
                </label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (addressError) {
                      setAddressError("");
                    }
                  }}
                  onBlur={handleAddressBlur}
                  required
                />
                {addressError && (
                  <p className="mt-1 text-sm text-red-500">{addressError}</p>
                )}
              </div>
            </div>
          </div>

          {/* Agreement */}
          <div className="mb-3 space-y-4">
            <label className="flex items-center space-x-3 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={agree}
                onChange={handleAgreeChange}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
              />
              <span>
                Saya menyetujui{" "}
                <a href="#" className="text-indigo-600 underline">
                  syarat dan ketentuan
                </a>
              </span>
              {agreeError && (
                <p className="mt-1 text-sm text-red-500">{agreeError}</p>
              )}
            </label>

            <div className="mt-3 flex w-full flex-col justify-center space-y-2">
              <Button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition duration-300 hover:shadow-xl"
              >
                {isLoading ? "Processing..." : "Register Now"}
              </Button>
              <Button
                type="button"
                onClick={() => router.back()} // atau sesuaikan dengan link tujuan
                className="w-full rounded-full bg-gradient-to-r from-red-500 to-red-700 px-6 py-3 text-lg font-semibold text-white shadow-lg transition duration-300 hover:shadow-xl"
              >
                Back
              </Button>
            </div>
          </div>
        </form>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-w-3/4 rounded-xl bg-white p-6 text-center shadow-xl">
            <h2 className="mb-2 text-2xl font-semibold text-green-600">
              Berhasil!
            </h2>
            <p className="mb-4 text-gray-700">
              Pendaftaran berhasil. Mengarahkan ke halaman login...
            </p>
            <div className="flex justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterCustomerPage;
