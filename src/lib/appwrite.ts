"use server";

import { Client, Account, ID, Users, Databases, Query } from 'node-appwrite';
import { cookies } from 'next/headers';

export async function createSessionClient() {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

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
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
        .setKey(process.env.NEXT_PUBLIC_APPWRITE_KEY!);

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

export async function signUpWithEmail(values: { name: string; email: string; password: string }) {
    const { name, email, password } = values;
    console.log(name,email,password);
    const { account } = await createAdminClient();

  try {
    await account.create(ID.unique(), email, password, name);
    const session = await account.createEmailPasswordSession(email, password);
    (await cookies()).set("writingenie", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    return { success: true };
  } catch (error) {
    console.error("Sign up failed:", error);
    return { success: false, error: "Sign up failed. Please try again." };
  }
}


export async function loginWithEmail(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  
    if (!email || !password ) {
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
      if (error instanceof Error) {
        return { success: false, error: error.message };
      } else {
        return { success: false, error: "An unknown error occurred while logging in" };
      }
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


export async function createProjectinDb(type: string, title: string, keywords: Array<string>) {
  console.log("data==>", title, type, keywords);
  try {
    // Fetch logged-in user's details
    const loggedInUser = await getLoggedInUser();
    if (!loggedInUser) {
      return { success: false, error: "User not logged in" };
    }

    const { email } = loggedInUser;
    const { account } = await createAdminClient();
    const databases = new Databases(account.client);
    const projectId = ID.unique();
    const keywordsString = keywords.join(' ');
    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${now.getFullYear()}`;

    const response = await databases.createDocument(
      process.env.APPWRITE_DATABASE!,
      process.env.PROJECT_EMAIL_COLLECTION!,
      ID.unique(),
      {
        email: email,
        projectId: projectId,
        title: title,
        type: type,
        keywords: keywordsString,
        time: formattedDate,
      }
    );

    return { success: true, response };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: error || "Error creating project" };
  }
}

