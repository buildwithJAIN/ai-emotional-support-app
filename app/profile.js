import ProfileView from "../app/views/_profileView";
import FooterView from "../components/FooterView";

export default function ProfileScreen() {
  return (
    <>
      <ProfileView />
      <FooterView current="profile" />
    </>
  );
}
