
import { getAuthSession } from "@/lib/auth"
import { NextResponse } from 'next/server';

const withAuth = (handler, allowedRoles = []) => async (req, ...restArgs) => {
    const session:any = await getAuthSession();

    // if (!session) {
    //     return NextResponse.json({ message: 'Non autorisé' }, { status: 401 });
    // }

    // if (allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
    //     return NextResponse.json({ message: "Votre compte n'a pas les permissions nécessaires" }, { status: 401 });
    // }

    req.user = session.user;

    return handler(req, ...restArgs);
};

export default withAuth;