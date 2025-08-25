// app/dashboard/followers/[userId]/page.jsx
import FollowersPage from "@/components/follow/FollowersPage";

export default function Followers({ params }) {
  return <FollowersPage params={params} />;
}