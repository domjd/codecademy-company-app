import ResultsListItem from "./ResultsListItem";
import { useUserContext } from "../hooks/hooks";
import Spinner from "./Spinner";
import { TCompanyType } from "../types/types";

function FollowedCompanies() {
  const { followedCompanies, isLoading } = useUserContext();

  return (
    <>
      <h2>Followed Companies</h2>
      <div className="results" style={{}}>
        {isLoading ? (
          <Spinner width={100} height={100} />
        ) : (
          <ul className="results_list">
            {followedCompanies?.map((company: TCompanyType) => (
              <ResultsListItem key={company.company_number} company={company} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default FollowedCompanies;
