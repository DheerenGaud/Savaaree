import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs"; // Required for reading files

const client = new S3Client({
    region: process.env.AWS_REGION, // Use the correct environment variable for the region
    credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    },
});

/**
 * Generates a pre-signed URL for accessing a file in S3.
 * @param {string} bucketName - The name of the S3 bucket.
 * @param {string} fileName - The name of the file in the bucket.
 * @param {number} [expiresIn=3600] - The expiration time for the URL in seconds (default: 1 hour).
 * @returns {Promise<string>} - A promise that resolves to the pre-signed URL.
 */
async function generatePresignedUrl(bucketName, fileName, expiresIn = 3600) {
    try {
        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: fileName,
        });

        const url = await getSignedUrl(client, command, { expiresIn });
        return url;
    } catch (error) {
        console.error("Error generating pre-signed URL:", error);
        throw error;
    }
}

/**
 * Constructs the public URL for a file in a public S3 bucket.
 * @param {string} bucketName - The name of the S3 bucket.
 * @param {string} fileName - The name of the file in the bucket.
 * @returns {string} - The public URL for the file.
 */
function getPublicFileUrl(bucketName, fileName) {
    const publicUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    return publicUrl;
}

/**
 * Uploads a file to an S3 bucket.
 * @param {string} bucketName - The name of the S3 bucket.
 * @param {string} fileName - The name of the file to be stored in the bucket.
 * @param {string} filePath - The local path to the file to upload.
 * @returns {Promise<string>} - A promise that resolves to the public URL of the uploaded file.
 */
const uploadPhotoToS3 = async (bucketName, localFilePath) => {
const client2 = new S3Client({
    region: process.env.AWS_REGION, // Use the correct environment variable for the region
    credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    },
});

    try {
        if (!localFilePath) return null;

        const fileContent = fs.readFileSync(localFilePath);
        const fileName = `photo-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`;

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: fileName,
            Body: fileContent,
            ContentType: "image/jpeg",
        });

        await client2.send(command);
        
        // Clean up temp file
        fs.unlinkSync(localFilePath);
        
        return getPublicFileUrl(bucketName, fileName);
    } catch (error) {
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        console.error("Error uploading to S3:", error);
        return null;
    }
};

// Example starter function to test upload and public URL
const start = async (bucketName, filePath) => {
    try {
        // Upload the file and get the public URL
        const publicUrl = await uploadPhoto(bucketName, filePath);
        console.log("Uploaded file public URL:", publicUrl);
    } catch (error) {
        console.error("Error in upload process:", error);
    }
};

// Export functions
export { start, getPublicFileUrl, uploadPhotoToS3 };
