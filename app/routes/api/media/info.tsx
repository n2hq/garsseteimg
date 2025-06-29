import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { DoResponse, headers } from "~/lib/lib";

export const loader: LoaderFunction = async ({ request, params }) => {
    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: headers,
        });
    }

    return DoResponse({ error: "method not allowed" }, 405)


}

export const action = async ({ request }: ActionFunctionArgs) => {
    const req = request as any;

    return DoResponse({
        message: "Hello",
    }, 200)
};