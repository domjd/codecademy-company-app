import { TCompanyTypeExpanded } from "../types/types";

type TCompanyTableProps = {
  company: TCompanyTypeExpanded;
};

function CompanyTable({ company }: TCompanyTableProps) {
  return (
    <table className="company_table">
      <tbody>
        <tr>
          <td>Company status</td>
          <td>{company?.company_status}</td>
        </tr>
        <tr>
          <td>Company type</td>
          <td>{company?.type}</td>
        </tr>
        {company?.sic_codes && (
          <tr>
            <td>Nature of Business</td>
            <td>{company?.sic_codes?.map((code) => code + ", ")}</td>
          </tr>
        )}
        <tr>
          <td>Incorporated on</td>
          <td>{company?.date_of_creation}</td>
        </tr>
        {company?.date_of_cessation && (
          <tr>
            <td>Dissolved on</td>
            <td>{company?.date_of_cessation}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default CompanyTable;
