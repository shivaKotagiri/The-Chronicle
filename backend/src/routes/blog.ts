import { Hono } from "hono"
import { getDB } from "../lib/db";
import authMiddleware from "../middlewares/middleware";
import { BlogValidation, BlogUpdateValidation } from "@shivakumarkotagiri/common-blogs-app";

const blogRouter = new Hono<{
  Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
  Variables:{
    userId: string
  }
}>();

blogRouter.use('*', authMiddleware);

blogRouter.post('/', async (c) => {
  const prisma = getDB(c.env.DATABASE_URL);
  const body = await c.req.json();
  const { success } = BlogValidation.safeParse(body);
  if(!success){
    return c.json({
      message: "Invalid Inputs",
    }, 400);
  }
  const id = c.get("userId");

  try {
    const blog = await prisma.blog.create({
      data:{
        title: body.title,
        description: body.description,
        authorId: id,
      }
    });
    return c.json({
      message: "blog created successfully",
      blogId: blog.id,
    }, 201);
  }
  catch(e){
    return c.json({
      message: "Failed to Create the blog TRY AGAIN LATER!!",
      error: String(e),
    }, 403);
  }
});

blogRouter.put('/:id', async (c) => {
  const blogId = c.req.param("id");
  const body = await c.req.json();
  const { success } = BlogUpdateValidation.safeParse(body);
  if(!success){
    return c.json({
      message: "Invalid Inputs",
    }, 422);
  }
  const prisma = getDB(c.env.DATABASE_URL);
  try {
    const blog = await prisma.blog.update({
      where: {
        id: blogId,
        authorId: c.get("userId"),
      },
      data: {
        title: body.title,
        description: body.description
      }
    });
    return c.json({
      message: "successfully updated the blog",
      blogId: blog.id,
    });
  }
  catch ( e ) {
    return c.json({
      message: "Failed to update the blog, Please Try Again Later!!",
      error: String(e),
    }, 403);
  }
});

blogRouter.get('/bulk', async (c) => {
  const prisma = getDB(c.env.DATABASE_URL);
  try {
    const blogs = await prisma.blog.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        publishedAt: true,
        author: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });

    return c.json({
      blogs
    })
  }
  catch(e){
    return c.json({
      message: "Unable to fetch all the blogs",
      error: String(e),
    });
  }
});


blogRouter.get('/userblogs', async (c) => {
  const prisma = getDB(c.env.DATABASE_URL);
  try {
    const userBlogs = await prisma.blog.findMany({
      where: {
        authorId: c.get("userId")
      },
      select: {
        title: true,
        id: true,
        description: true,
        publishedAt: true,
        author: {
          select: {
            firstName: true,
            lastName: true,
          }
        }
      }
    });

    if(userBlogs.length === 0){
      return c.json({
        message: "No available blogs",
        userBlogs: []
      });
    }

    return c.json({
      userBlogs,
    })

  } catch(e) {
    return c.json({
      message: "something went wrong with fetching the user blogs",
      error: String(e),
      userBlogs:[],
    }, 500);
  }
});

blogRouter.get('/search', async (c) => {
  const value = (c.req.query("value") || "").replace(/"/g, '');
  // const value = c.req.query("value") || "";
  const prisma = getDB(c.env.DATABASE_URL);
  try {
    const searchResults = await prisma.blog.findMany({
      where: {
        OR: [
          {
            title: {
              contains: value,
              mode: "insensitive"
            }
          },
          {
            description: {
              contains: value,
              mode: "insensitive"
            }
          }
        ]
      },
      orderBy: {
        author:{
          email: 'asc',
        }
      },
      select: {
        id: true,
        title: true,
        description: true,
        authorId: true,
        author: {
          select: {
            firstName: true,
            lastName: true,
          }
        }
      }
    });

    if(searchResults.length === 0){
      return c.json({
        message: "No available blogs based on the search result"
      })
    }
    else{
      return c.json({
        message: "Successfully fetched the blogs based on the search results",
        searchResults
      })
    }
  } catch(e) {
    return c.json({
      message: "Failed to fetch the blogs",
      error: String(e),
    }, 403);
  }
});

blogRouter.get('/:id', async (c) => {
  const blogId = c.req.param("id");
  const prisma = getDB(c.env.DATABASE_URL);
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
      select: {
        title: true,
        description: true,
        id: true,
        publishedAt: true,
        author: {
          select: {
            firstName: true,
            lastName: true,
          }
        }
      }
    });

    return c.json({
      message: "Successfully fetched the blog",
      blog,
    }, 201);
  } catch(e) {
    return c.json({
      message: "Unable tp fetch the blog",
      error: String(e),
    });
  }
});

blogRouter.delete('/delete/:id', async (c) => {
  const id = c.req.param('id');
  const prisma = getDB(c.env.DATABASE_URL);

  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: id
      }
    });

    if (!blog) {
      return c.json({
        message: "Blog not found"
      }, 404);
    }

    if (blog.authorId !== c.get("userId")) {
      return c.json({
        message: "Unauthorized: You can only delete your own blogs"
      }, 401);
    }

    const deletedBlog = await prisma.blog.delete({
      where: {
        id: id
      }
    });

    return c.json({
      message: "Successfully deleted the blog",
      blogId: deletedBlog.id
    });
  }
  catch (e) {
    return c.json({
      message: "Failed to delete the blog. Please try again later.",
      error: String(e)
    }, 500);
  }
});

export default blogRouter
