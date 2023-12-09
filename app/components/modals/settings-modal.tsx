"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import type { User } from "@prisma/client";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import type { FieldValues, SubmitHandler } from "react-hook-form";

import Modal from "@/app/components/modals/modal";
import Input from "@/app/components/inputs/input";
import Button from "@/app/components/button";

type SettingsModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
};

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong."))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your public information
            </p>

            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />

              <div role="form">
                <label
                  htmlFor="image-upload"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div
                  className="mt-2 flex items-center gap-x-3"
                  id="image-upload"
                >
                  <Image
                    src={
                      image || currentUser?.image || "/images/placeholder.jpg"
                    }
                    alt={currentUser?.name || "profile avatar"}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <CldUploadButton
                    options={{
                      maxFiles: 1,
                      maxFileSize: 4000000, // 4 mb
                    }}
                    onUpload={handleUpload}
                    uploadPreset={
                      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET
                    }
                  >
                    <Button type="button" disabled={isLoading} secondary>
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              secondary
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
