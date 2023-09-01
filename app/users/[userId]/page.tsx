import getUser from "@/lib/getUser";
import getUserPosts from "@/lib/getUserPosts";
import React, { Suspense } from "react";
import UserPosts from "../../../components/users/user/UserPosts";
import { Metadata } from "next";
import getAllUsers from "@/lib/getAllUsers";

type Props = {
  params: {
    userId: string;
  };
};

export async function generateMetadata({
  params: { userId },
}: Props): Promise<Metadata> {
  const userData: Promise<User> = getUser(userId);
  const user: User = await userData;
  return {
    title: user.name,
    description: `This is the page of ${user.name}`,
  };
}

export default async function UserPage({ params: { userId } }: Props) {
  const userData: Promise<User> = getUser(userId);
  const postsData: Promise<Post[]> = getUserPosts(userId);

  // const [user, userPosts] = await Promise.all([userData, postsData]);

  const user = await userData;

  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        <UserPosts promise={postsData} />
      </Suspense>
    </>
  );
}

// Gets the needed data for the requests being made
// in this component, making it SSG enabled for nextjs
export async function generateStaticParams() {
  const usersData: Promise<User[]> = getAllUsers();
  const users = await usersData;

  return users.map((user: User) => ({ userId: String(user.id) }));
}
