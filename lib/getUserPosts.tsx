export default async function getUserPosts(userId: string) {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) throw new Error("failed to fetch user");

    return res.json();
  } catch (err) {
    console.log(err);
  }
}
