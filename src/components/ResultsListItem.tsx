import { useCompaniesContext } from "../hooks/hooks";
import { TCompanyType } from "../types/types";
import PrimaryButton from "./PrimaryButton";

type TResultsListItem = {
  company: TCompanyType;
};

function ResultsListItem({ company }: TResultsListItem) {
  const { handleDrawerChange } = useCompaniesContext();
  return (
    <li className="results_list_item">
      <div className="results_list_item_details">
        <h3 className="results_list_item_company_name">{company.title}</h3>
        <p className="results_list_item_company_number">
          {company.company_number}
        </p>

        <p className="results_list_item_subtitle">{company.address_snippet}</p>
      </div>
      <PrimaryButton onClick={() => handleDrawerChange(company.company_number)}>
        More Info
      </PrimaryButton>
    </li>
  );
}

export default ResultsListItem;
