

export const headers = {
    "Access-Control-Allow-Origin": "*",  // Allow all origins
    "Access-Control-Allow-Methods": "*",  // Allow specific methods
    "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow specific headers
    //"Access-Control-Allow-Credentials": "true", // Optional: if using cookies/auth
    "Cache-Control": "no-store" // Note: "cache" isn't valid; use "Cache-Control"
};

export const getHeaders = (req: any) => {
    const origin = req.headers.get("Origin");
    return {
        //"Access-Control-Allow-Origin": import.meta.env.VITE_SITE_BASE_URL,  // Allow all origins
        "Access-Control-Allow-Methods": "*",  // Allow specific methods
        "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allow specific headers
        //"Access-Control-Allow-Credentials": "true", // Optional: if using cookies/auth
        "Cache-Control": "no-store" // Note: "cache" isn't valid; use "Cache-Control"
    };
}

export function DoResponse(json: any, code: number = 500) {
    return new Response(
        JSON.stringify(json),
        {
            status: code
        }
    )
}

export function GetResponse(req: any, json: any, code: number = 500) {
    return new Response(
        JSON.stringify(json),
        {
            status: code,
            headers: headers
        }
    )
}