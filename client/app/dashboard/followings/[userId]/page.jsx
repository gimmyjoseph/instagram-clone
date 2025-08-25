// app/dashboard/followings/[userId]/page.jsx
import FollowingsPage from "@/components/follow/FollowingsPage";

export default function Followings({ params }) {
  return <FollowingsPage params={params} />;
}