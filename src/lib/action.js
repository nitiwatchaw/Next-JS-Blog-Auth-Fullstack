"use server"

import { Post, User } from "./models";
import { connectToDb } from "./utils"
import { revalidatePath } from "next/cache"
import { auth, signIn, signOut } from '@/lib/auth'
import bcrypt from 'bcryptjs'

export const addPost = async (prevState, formData) => {

    const { title, desc, slug, userId, img, userName } = Object.fromEntries(formData)

    if (img && !(img.startsWith('/') || img.startsWith('http') || img.startsWith('https'))) {

        return { error: 'Invalid img path' };
    }

    const sameSlug = await Post.findOne({ slug });

    if (sameSlug) {
        return { error: 'Slug already exists' };
    }


    if (slug && slug.includes(" ")) {
        return { error: 'Slug cannot contain space characters' };
    }
    try {
        connectToDb()
        const newPost = new Post({
            title, desc, slug, userId, img,
        })


        await newPost.save()

        // ไว้update ข้อมูล
        revalidatePath('/blog')
        revalidatePath(`/blog/${slug}`)
        revalidatePath('/admin')
        return { complete: `Post Added! by ${userName}` };

    }
    catch (err) {

        return { error: "Something went wrong" }
    }
}

export const editPost = async (prevState, formData) => {

    const { title, desc, slug, img, postId } = Object.fromEntries(formData);

    if (img && !(img.startsWith('/') || img.startsWith('http') || img.startsWith('https'))) {
        return { error: 'Invalid img path' };
    }

    if (slug && slug.includes(" ")) {
        return { error: 'Slug cannot contain space characters' };
    }

    if (!title) {
        return { error: 'Please fill title' };
    }

    if (!desc) {
        return { error: 'Please fill description' };
    }

    if (!slug) {
        return { error: 'Please fill slug' };
    }

    try {

        await connectToDb();

        const sameSlug = await Post.findOne({ slug, _id: { $ne: postId } });

        if (sameSlug) {
            return { error: 'Slug already exists' };
        }

        const existingPost = await Post.findById(postId);


        // Update user details
        existingPost.title = title;
        existingPost.slug = slug;
        existingPost.img = img;
        existingPost.desc = desc;

        await existingPost.save();

        revalidatePath('/blog');
        revalidatePath(`/editPostForm/${slug}`);


        return { success: 'Update post complete' };
    } catch (err) {
        console.log(err);
        return { error: 'Something went wrong' };
    }
};

export const deletePost = async (formData) => {

    const { id } = Object.fromEntries(formData)

    try {
        connectToDb()

        await Post.findByIdAndDelete(id)
        console.log(`deleted fron db ${id}`)
        revalidatePath('/blog')
        revalidatePath('/admin')
        revalidatePath(`/blog/${id}`)
    }
    catch (err) {
        console.log('there was an error', err)

    }
}

export const addUser = async (prevState, formData) => {

    const { username, email, password, passwordRepeat, img, isAdmin } = Object.fromEntries(formData);

    const isAdminValue = isAdmin === 'true' ? true : false;

    if (img && !(img.startsWith('/') || img.startsWith('http') || img.startsWith('https'))) {
        return { error: 'Invalid img path' };
    }

    if (isAdmin === ' ') {
        return { error: 'Please select a valid value for Is Admin' };
    }

    if (password !== passwordRepeat) {
        console.log('Passwords do not match')
        return { error: 'Passwords do not match' }
    }

    if (!password) {
        return { error: 'please define your password' };
    }


    try {
        connectToDb();
        const user = await User.findOne({ username })

        if (user) {
            return { error: 'Username already exists' }
        }

        // แปลง password ให้เป็น hashed
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username, email, password: hashedPassword, img, isAdmin: isAdminValue
        })

        await newUser.save()
        revalidatePath("/admin");
    } catch (err) {
        console.log(err);
        return { error: "Something went wrong!" };
    }
};


export const deleteUser = async (formData) => {

    const { id } = Object.fromEntries(formData)

    try {
        connectToDb()
        await Post.deleteMany({ userId: id })
        await Post.updateMany({ likedBy: id }, { $pull: { likedBy: id } })

        await User.findByIdAndDelete(id)
        console.log(`deleted fron db ${id}`)
        revalidatePath('/admin')
    }
    catch (err) {
        console.log('there was an error', err)

    }
}





// * login ในส่วนของ github
// login
export const handleGithubLogin = async () => {
    "use server"
    await signIn('github')
}




// logout
export const handleLogout = async () => {
    "use server"

    await signOut()
}


//register
export const register = async (previousState, formData) => {
    const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData)

    // หาก password ไม่ตรงกัน
    if (password !== passwordRepeat) {
        console.log('Passwords do not match')
        return { error: 'Passwords do not match' }
    }

    if (img && !(img.startsWith('/') || img.startsWith('http') || img.startsWith('https'))) {
        return { error: 'Invalid img path' };
    }

    if (!password) {
        return { error: 'please define your password' };
    }

    try {
        connectToDb()

        const user = await User.findOne({ username })

        if (user) {
            return { error: 'Username already exists' }
        }

        // แปลง password ให้เป็น hashed
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username, email, password: hashedPassword, img
        })

        await newUser.save()
        console.log('save to db')

        return { success: true }
    }
    catch (err) {
        console.log(err)
    }
}


// edit user
export const editUser = async (previousState, formData) => {
    const { id, username, email, img } = Object.fromEntries(formData);

    if (img && !(img.startsWith('/') || img.startsWith('http') || img.startsWith('https'))) {
        return { error: 'Invalid img path' };
    }

    try {

        await connectToDb();

        // Find the existing user
        const existingUser = await User.findById(id);

        if (!existingUser) {
            return { error: 'User not found' };
        }


        // Update user details
        existingUser.username = username;
        existingUser.email = email;
        existingUser.img = img;


        await existingUser.save();


        revalidatePath('/blog');
        revalidatePath('/editUser');
        revalidatePath('/userDetail');

        return { success: 'User details updated successfully please login again' };

    } catch (err) {
        console.error(err);
        return { error: 'An error occurred while updating user details' };
    }
};


//login
export const login = async (previousState, formData) => {
    const { username, password } = Object.fromEntries(formData)

    try {
        await signIn('credentials', { username, password })
    }
    catch (err) {
        if (err?.message.includes("CredentialsSignin")) {
            return { error: "Invalid username or password!" }
        }
        throw err
    }

}


export const addLike = async (previousState, formData) => {
    const { id, postId } = Object.fromEntries(formData)
    try {
        await connectToDb();
        const user = await User.findById(id)
        const post = await Post.findById(postId)

        const hasLiked = post.likedBy.includes(user._id);

        if (hasLiked) {

            post.likedBy.pull(user._id);
        } else {

            post.likedBy.push(user._id);
        }


        await post.save();
        revalidatePath(`/blog/${post._doc.slug}`);

    }
    catch (err) {
        return { error: 'An error with like action' };
    }
}