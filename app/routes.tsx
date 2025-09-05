import { DefineRoutesFunction } from '@remix-run/dev/dist/config/routes';


export function setupRoutes(defineRoutes: DefineRoutesFunction) {
    return defineRoutes((route) => {
        route("/", "routes/_index.tsx");

        route("/user_profile_pic_upload", "routes/api/media/user_profile_pic_upload.tsx");
        route("/business_profile_pic_upload", "routes/api/media/business_profile_pic_upload.tsx");
        route("/business_profile_bg_upload", "routes/api/media/business_profile_bg_upload.tsx");
        route("/business_gallery_pic_upload", "routes/api/media/business_gallery_pic_upload.tsx");
        route("/business_gallery_pic_update", "routes/api/media/business_gallery_pic_update.tsx");
        route("/delete_business_gallery_pic", "routes/api/media/delete_business_gallery_pic.tsx");
        route("/business_gallery_product_upload", "routes/api/media/business_gallery_product_upload.tsx");
        route("/business_gallery_product_update", "routes/api/media/business_gallery_product_update.tsx");


        route("/info", "routes/api/media/info.tsx");
        //route("/api/listings/featured_listing", "routes/api/listings/featured_listing.tsx");
    });
}