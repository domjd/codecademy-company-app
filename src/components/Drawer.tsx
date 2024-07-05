import { useCompaniesContext } from "../hooks/hooks";
import CompanyDetails from "./CompanyDetails";
import { Cross1Icon } from "@radix-ui/react-icons";

function Drawer() {
  const { drawerOpen, handleDrawerChange } = useCompaniesContext();
  return (
    <div
      className={`drawer_container ${
        drawerOpen ? "drawer_container--isopen" : ""
      }`}
    >
      <button
        className="drawer_close_button"
        onClick={() => {
          handleDrawerChange();
        }}
      >
        <Cross1Icon width="18" height="18" />
      </button>
      <CompanyDetails />
    </div>
  );
}

export default Drawer;
