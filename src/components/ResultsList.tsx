import { useCompaniesContext, useSearchQuery } from "../hooks/hooks";
import { TCompanyType } from "../types/types";
import ResultsListItem from "./ResultsListItem";
import Spinner from "./Spinner";

function ResultsList() {
  const { state, companiesSliced, handlePageChange, debouncedSearchText } =
    useCompaniesContext();
  useSearchQuery(debouncedSearchText);

  return (
    <div className="results">
      {state.isLoading ? (
        <Spinner />
      ) : (
        <ul className="results_list">
          {companiesSliced?.map((company: TCompanyType) => (
            <ResultsListItem key={company.company_number} company={company} />
          ))}
        </ul>
      )}
      {state.companies.length > 0 && (
        <div className="pagination_controls">
          {state.currentPage > 1 && (
            <button
              className="pagination_button pagination_button_previous"
              onClick={() => {
                handlePageChange("previous");
              }}
            >
              Prev
            </button>
          )}
          <button
            className="pagination_button pagination_button_next"
            onClick={() => {
              handlePageChange("next");
            }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ResultsList;
