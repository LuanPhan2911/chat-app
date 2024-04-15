import client from "../lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getUsers() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }
    const users = await client.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        email: {
          not: currentUser.email,
        },
      },
    });
    return users;
  } catch (error) {
    return [];
  }
}
