import { Hono } from "hono"
import { sign } from "hono/jwt"
import { getDB } from "../lib/db"
import authMiddleware from "../middlewares/middleware";
import { SignupValidation, SigninValidation, InputUpdateValidation } from "@shivakumarkotagiri/common-blogs-app"

const userRouter = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
  Variables: {
    userId: string,
  }
}>();

userRouter.post('/signup', async (c) => {
  try {
    const prisma = getDB(c.env.DATABASE_URL);
    const body = await c.req.json();
    const { success } = SignupValidation.safeParse(body);
    if(!success){
      return c.json({
        message: "Invalid Inputs",
      }, 422);
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName,
      }
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      message: "Signup Successful!",
      token: String(token),
    });

  } catch(e) {
    console.error("Signup error:", e);
    return c.json({
      message: "Something went wrong with Signup. Try again!",
      error: String(e),
    }, 500);
  }
});

userRouter.post('/signin', async (c) => {
  try {
    const prisma = getDB(c.env.DATABASE_URL);
    const body = await c.req.json();

    const { success } = SigninValidation.safeParse(body);
    if(!success){
      return c.json({
        message: "Invalid Inputs",
      }, 422);
    }

    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      }
    });

    if (!user) {
      return c.json({
        message: "Invalid email or password"
      }, 403);
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      message: "Signin Successful!",
      token: token,
    });

  } catch(e) {
    console.error("Signin error:", e);
    return c.json({
      message: "Something went wrong with Signin. Try again!",
      error: String(e),
    }, 500);
  }
});

userRouter.put('/update', authMiddleware, async (c) => {
  const body = await c.req.json();
  const { success } = InputUpdateValidation.safeParse(body);
    if(!success){
      return c.json({
        message: "Invalid Inputs",
      }, 400);
    }
  const prisma = getDB(c.env.DATABASE_URL);
  try {
    const user = await prisma.user.update({
      where: {
        id: c.get("userId"),
      },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        password: body.password,
      },
      select: {
        firstName: true,
        lastName: true,
        password: true
      }
    });
    if(!user){
      return c.json({
        message: "Invalid user to update the creds"
      }, 401);
    }
    else{
      return c.json({
        message: "User creds Updated successfully!!",
        user,
      })
    }
  } catch(e) {
    return c.json({
      message: "Something went wrong with updating the user",
      error: String(e),
    }, 500);
  }
});

userRouter.delete('/delete', authMiddleware, async (c) => {
  const userId = c.get("userId");
  const prisma = getDB(c.env.DATABASE_URL);
  try {
    await prisma.blog.deleteMany({
      where: {
        authorId: userId
      }
    });

    const user = await prisma.user.delete({
      where: {
        id: userId,
      }
    });

    return c.json({
      message: "User deleted Successfully",
      id: user.id,
    });
  } catch(e) {
    console.error("Delete error:", e);
    return c.json({
      message: "Something went wrong with deleting the user",
      error: String(e),
    }, 500);
  }
});

userRouter.get('/test-prisma', async (c) => {
  try {
    const prisma = getDB(c.env.DATABASE_URL);
    const count = await prisma.user.count();

    return c.json({
      success: true,
      count
    });
  } catch (e) {
    return c.json({
      success: false,
      error: String(e)
    }, 500);
  }
});


userRouter.delete('/admin/users/delete-all', async (c) => {
  try {

    const prisma = getDB(c.env.DATABASE_URL);
    await prisma.blog.deleteMany({});
    const deleteCount = await prisma.user.deleteMany({});

    return c.json({
      success: true,
      message: `Successfully deleted ${deleteCount.count} users`,
      deletedCount: deleteCount.count
    });
  } catch (error) {
    console.error("Error deleting users:", error);
    return c.json({
      success: false,
      message: "Failed to delete users",
      error: String(error)
    }, 500);
  }
});

userRouter.get("all",async (c) => {
  const prisma = getDB(c.env.DATABASE_URL);
  try {
    const users = await prisma.user.findMany({});
    return c.json({
      users
    })
  }
  catch(e:any){
    console.log("The error is",e);
  }
})

export default userRouter;
