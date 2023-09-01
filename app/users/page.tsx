import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import getAllUsers from "@/lib/getAllUsers";

export const metadata: Metadata = {
  title: "Users",
};

// This will request will run on build time
export default async function UsersPage() {
  const users: User[] = await getAllUsers();

  console.log("\n\n Hello, i'm on the server side! \n");

  const content = (
    <section>
      <h2>
        <Link href="/">Back to Home</Link>
      </h2>
      <br />
      {users &&
        users.map((user) => {
          return (
            <>
              <p key={user.id}>
                <Link href={`/users/${user.id}`}>{user.name}</Link>
              </p>
              <br />
            </>
          );
        })}
    </section>
  );
  return content;
}
