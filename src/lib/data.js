import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { unstable_noStore as noStore } from "next/cache";




export const getPosts = async () => {
  try {
    connectToDb();

    const posts = await Post.find()
    return posts;
  } catch (err) {
    console.log(err);
  }
};


export const getPostsPagination = async ({ query, page = 1, limit = 1 }) => {
  try {
    connectToDb();

    const skip = (page - 1) * limit;
    let postsQuery = Post.find();

    if (query) {
      const regexQuery = { $regex: new RegExp(query, 'i') };
      postsQuery = postsQuery.find({
        $or: [
          { title: regexQuery },
          { desc: regexQuery },
        ],
      });
    }

    const countQuery = postsQuery.clone();

    const totalPosts = await countQuery.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    const result = await postsQuery.limit(limit).skip(skip).exec();

    return {
      totalPages,
      currentPage: page,
      result,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getUsersPagination = async ({ query, page = 1, limit = 1 }) => {
  try {
    connectToDb();
    const skip = (page - 1) * limit;
    let userQuery = User.find();

    if (query) {
      const regexQuery = { $regex: new RegExp(query, 'i') };
      userQuery = userQuery.find({
        $or: [
          { username: regexQuery },
          { email: regexQuery },
        ],
      });
    }

    const countQuery = userQuery.clone();
    const totalUsers = await countQuery.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);
    const result = await userQuery.limit(limit).skip(skip).exec();
    return {
      totalPages,
      currentPage: page,
      result,
    };
  }
  catch (err) {
    console.log(err)
  }
}


export const getPost = async (slug) => {
  try {
    connectToDb();
    const post = await Post.findOne({ slug });
    return post;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch post!");
  }
};

export const getUser = async (id) => {
  noStore();
  try {
    connectToDb();
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const getUsers = async () => {
  try {
    connectToDb();
    const users = await User.find();
    return users;
  } catch (err) {
    console.log(err);
  }
};