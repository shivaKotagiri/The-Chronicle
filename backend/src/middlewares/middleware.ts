import { Context, Next } from "hono";
import { verify } from "hono/jwt";

async function authMiddleware(c: Context, next: Next){
  const authHeader = c.req.header("Authorization") || "";

  try {
    const token = authHeader.trim().split(" ")[1];
    if(!token){
      return c.json({
        message: "Authentication token is missing"
      }, 401);
    }

    const payload = await verify(token, c.env.JWT_SECRET);
    const userId = typeof payload === 'object' ?
      (payload.id || payload.userId || '') :
      String(payload);

    if (!userId) {
      return c.json({
        message: "Unable to enter the page"
      }, 401);
    }

    c.set("userId", String(userId));

    await next();
  }
  catch(e){
    return c.json({
      message: "Some went wrong with user authorization",
      error: String(e)
    }, 403);
  }
}

export default authMiddleware;

