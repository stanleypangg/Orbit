/**
 * Upload image to a temporary hosting service
 * For production, replace with your preferred image hosting service (S3, Cloudinary, etc.)
 */
export async function uploadImageToTemporaryHost(file: File): Promise<string> {
  // Using tmpfiles.org as a temporary solution for POC
  // Replace with your own image hosting service in production

  const formData = new FormData();
  formData.append("file", file);

  try {
    // Option 1: Upload to imgbb (free temporary hosting)
    // You'll need to get an API key from https://api.imgbb.com/
    // For now, we'll use a public upload service

    const response = await fetch("https://tmpfiles.org/api/v1/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const data = await response.json();

    // tmpfiles.org returns data.data.url
    // Convert the URL to direct link format
    if (data.data?.url) {
      // Convert https://tmpfiles.org/12345 to https://tmpfiles.org/dl/12345
      return data.data.url.replace("tmpfiles.org/", "tmpfiles.org/dl/");
    }

    throw new Error("Invalid response from upload service");
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}

/**
 * Convert file to data URL (base64)
 * Useful for preview or if backend can accept base64
 */
export function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error("Failed to read file"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}
