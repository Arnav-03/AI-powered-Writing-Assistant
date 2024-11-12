"use server";

import { Client, Account, ID, Users, Databases, Query } from 'node-appwrite';
import { cookies } from 'next/headers';

export async function createSessionClient() {
    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT!)
        .setProject(process.env.APPWRITE_PROJECT_ID!);

    const session = (await cookies()).get("writingenie");

    if (!session || !session.value) {
        throw new Error("No session");
    }
    client.setSession(session.value);
    return {
        get account() {
            return new Account(client);
        },
    };
}
export async function createAdminClient() {
    const client = new Client()
        .setEndpoint(process.env.APPWRITE_ENDPOINT!)
        .setProject(process.env.APPWRITE_PROJECT_ID!)
        .setKey(process.env.APPWRITE_KEY!);

    return {
        get account() {
            return new Account(client);
        },
        get users() {
            return new Users(client);
        },
    };
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        return await account.get();
    } catch {
        return null;
    }
}

export async function signUpWithEmail(values: { name: string; email: string; password: string; role: string }) {
    const { name, email, password, role } = values;

    const { account } = await createAdminClient();
    try {
        // Create a user and send OTP for email verification
        await account.create(ID.unique(), email, password, name);
        const otpResponse = await account.createEmailToken(ID.unique(), email);

        return { success: true, otpSent: true, userId: otpResponse.userId, role, redirect: false };
    } catch (error) {
        console.error("Sign up failed:", error);
        return { success: false, error: "Sign up failed. Please try again.", redirect: false };
    }
}

export async function loginWithEmail(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    if (!email || !password || !role) {
        return { success: false, error: "Missing required fields" };
    }

    const { account } = await createAdminClient();

    try {
        const session = await account.createEmailPasswordSession(email, password);
        (await cookies()).set("writingenie", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
        return { success: true };
    } catch (error) {
        console.error("Login failed:", error);
        return { success: false, error: "Invalid email or password" };
    }
}
export async function logout() {
    try {
        const { account } = await createSessionClient();
        await account.deleteSession('current');
        (await cookies()).delete('writingenie');
        return { success: true, message: 'Logged out successfully' };
    } catch (error) {
        console.error('Error during logout:', error);
        return { success: false, error: 'Error during logout' };
    }
}
