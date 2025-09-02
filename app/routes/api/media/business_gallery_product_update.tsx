import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { query } from "../DB";
import { DoResponse } from "~/lib/lib";

const galleryDir = path.resolve("public/business_gallery_pics");

export const loader: LoaderFunction = async ({ request, params }) => {
    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "http://localhost:3393",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Credentials": "true", // optional
            },
        });
    }

    return DoResponse({ error: "method not allowed" }, 405)


}

export const action = async ({ request }: ActionFunctionArgs) => {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const userGuid = formData.get("guid") as string;
        const businessGuid = formData.get("bid") as string;
        const productGuid = formData.get("product_guid") as string;
        const productTitle = (formData.get("product_title") as string) || "";
        const productDescription = (formData.get("product_description") as string) || "";
        const productLink = (formData.get("product_link") as string) || "";
        console.log(formData)

        if (!userGuid || !businessGuid || !productGuid) {
            return DoResponse({ error: "Missing required fields" }, 400);
        }

        const [existing] = await query(
            `SELECT * FROM tbl_business_gallery_products
            WHERE
            user_guid = ?
            AND
            business_guid = ?
            AND
            product_guid = ?`,
            [userGuid, businessGuid, productGuid]
        );


        const existingRecord = (existing as any);
        if (!existingRecord) {
            return DoResponse({ error: "Product does not exist" }, 404);
        }

        let fileUrl = existingRecord.product_image_url;
        let originalName = existingRecord.product_image_filename;
        let mimeType = existingRecord.mimetype;

        if (file) {
            console.log('herebol')
            // Generate unique name
            const uuidname = crypto.randomUUID();
            const ext = path.extname(file.name);
            const uniqueName = `${Date.now()}_${uuidname}${ext}`;
            const buffer = Buffer.from(await file.arrayBuffer());
            const filePath = path.join(galleryDir, uniqueName);

            await writeFile(filePath, buffer);

            // Delete old image
            const oldFilePath = path.join(galleryDir, existingRecord.product_image_filename);
            try {
                await unlink(oldFilePath);
            } catch (err: any) {
                if (err.code !== "ENOENT") console.error("Failed to delete old image:", err);
            }

            fileUrl = `/business_gallery_products/${uniqueName}`;
            originalName = uniqueName;
            mimeType = file.type;
        }



        const result = await query(
            `UPDATE tbl_business_gallery_products
            SET
            product_image_filename = ?,
            product_image_url = ?,
            mimetype = ?,
            product_title = ?,
            product_description = ?,
            product_link = ? 
            WHERE
            user_guid = ?
            AND
            business_guid = ?
            AND
            product_guid = ?`,
            [
                originalName,
                fileUrl,
                mimeType,
                productTitle,
                productDescription,
                productLink,
                userGuid,
                businessGuid,
                productGuid
            ]
        );

        return DoResponse(
            {
                message: "Gallery image updated successfully",
                fileUrl,
                insertId: existingRecord.id,
            },
            200
        );
    } catch (err: any) {
        console.error("Error updating gallery image:", err);
        return DoResponse({ message: err.message || "Update failed" }, 500);
    }
};

