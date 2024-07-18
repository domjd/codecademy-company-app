import { useUserContext } from "../hooks/hooks";
import { Cross1Icon } from "@radix-ui/react-icons";
import FollowedCompanies from "./FollowedCompanies";

function UserDrawer() {
  const { userDrawerOpen, handleUserDrawerChange } = useUserContext();
  return (
    <div
      className={`user_drawer_container ${
        userDrawerOpen ? "user_drawer_container--isopen" : ""
      }`}
    >
      <button
        className="drawer_close_button"
        onClick={() => {
          handleUserDrawerChange(false);
        }}
      >
        <Cross1Icon width="18" height="18" />
      </button>
      <FollowedCompanies />
    </div>
  );
}

export default UserDrawer;
