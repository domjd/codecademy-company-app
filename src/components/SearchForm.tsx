import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useCompaniesContext } from "../hooks/hooks";

function SearchForm() {
  const { state, dispatch } = useCompaniesContext();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    dispatch({ type: "SET_INDEX", payload: 1 });
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
    dispatch({ type: "SET_SEARCH_TERM", payload: searchTerm });
  };

  return (
    <form className="company_search_form" action="">
      <div className="company_search">
        <input
          value={state.searchTerm}
          type="text"
          name="company_search"
          id="company_search_input"
          className="input_field"
          placeholder="Search For Company"
          onChange={handleSearchChange}
        />
        <MagnifyingGlassIcon width="24" height="24" id="search_icon" />
      </div>
    </form>
  );
}

export default SearchForm;
