export const authConfig = {

    pages: {
        signIn: '/login'
    },
    providers: [],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.isAdmin = user.isAdmin;
                token.img = user.img;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id;
                session.user.isAdmin = token.isAdmin;
                session.user.username = token.username;
                session.user.img = token.img;
            }
            return session;
        },
        authorized({ auth, request }) {
            const user = auth?.user;

            const inOnAdminPanel = request.nextUrl?.pathname.startsWith('/admin')
            const inOnBlogPage = request.nextUrl?.pathname.startsWith('/blog')
            const inOnLoginPage = request.nextUrl?.pathname.startsWith('/login')
            const inOnUserDetailPage = request.nextUrl?.pathname.startsWith('/userDetail')
            const inOnUserEditPage = request.nextUrl?.pathname.startsWith('/editUser')
            const inOnMyPostPage = request.nextUrl?.pathname.startsWith('/myPost')
            const inOnEditPostPage = request.nextUrl?.pathname.startsWith('/editPostForm')
            // ONLY ADMIN CAN REACH THE ADMIN DASHBOARD
            if (inOnAdminPanel && !user?.isAdmin) {
                return false
            }

            // ONLY AUTHENTIACATED USERS CAN REACH THE BLOG PAGE
            if (inOnBlogPage && !user) {
                return false
            }

            // ONLY AUTHENTIACATED USERS CAN REACH THE LOGIN PAGE
            if (inOnLoginPage && user) {
                return Response.redirect(new URL('/', request.nextUrl))
            }
            // if not user then cannot get in userDetail page
            if (inOnUserDetailPage && !user) {
                return Response.redirect(new URL('/', request.nextUrl))
            }
            // if not user then cannot get in userEdit page
            if (inOnUserEditPage && !user) {
                return Response.redirect(new URL('/', request.nextUrl))
            }
            // if not user then cannot get in myPost page
            if (inOnMyPostPage && !user) {
                return Response.redirect(new URL('/', request.nextUrl))
            }
            if (inOnEditPostPage && !user  ) {
                return Response.redirect(new URL('/', request.nextUrl))
            }
            return true
        }
    }
}