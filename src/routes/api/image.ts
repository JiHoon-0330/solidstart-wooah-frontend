import axios from "axios";
import { APIEvent } from "solid-start";

export async function GET({ request }: APIEvent) {
  try {
    const { data } = await axios({
      method: "GET",
      url: request.url.split("src=")[1],
      responseType: "arraybuffer",
    });

    return new Response(Buffer.from(data, "base64"));
  } catch (error) {
    return new Response("");
  }
}
