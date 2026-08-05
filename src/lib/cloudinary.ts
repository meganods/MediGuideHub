// Cloudinary media helper
// In production, this can be called on server-side or via an API route to avoid exposing credentials.
// For simulation, we provide a clean client-side mock fallback returning a data URL or a default illustration.

export const isCloudinaryConfigured = !!(
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME &&
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
);

/**
 * Uploads a file (File object or Base64 string) to Cloudinary.
 * Falls back to returning a mock URL (object URL or standard placeholder) if not configured.
 */
export const uploadImage = async (file: File | string): Promise<string> => {
  if (isCloudinaryConfigured) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ""
      );

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Cloudinary upload failed");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed, falling back to mock:", error);
    }
  }

  // Fallback / Mock behavior:
  // If it's a File object, let's create a temporary object URL or read as base64
  if (file instanceof File) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }

  return file; // If it's already a base64 string or url, return it.
};
