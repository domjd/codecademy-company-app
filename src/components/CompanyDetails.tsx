import { HeartIcon } from "@radix-ui/react-icons";
import CompanyTable from "./CompanyTable";
import PrimaryButton from "./PrimaryButton";
import PeopleTable from "./PeopleTable";
import ChargesTable from "./ChargesTable";
import { useCompaniesContext } from "../hooks/hooks";
import { useState } from "react";

function CompanyDetails() {
  const { fullCompany } = useCompaniesContext();
  const [showPeopleOrCharges, setShowPeopleOrCharges] = useState(true);

  if (!fullCompany) {
    return <h1>No Company Found</h1>;
  }

  return (
    <div className="drawer_contents">
      <div>
        <h2>{fullCompany?.companyDetails.company_name}</h2>
        <p className="drawer_company_number">
          {fullCompany?.companyDetails.company_number}
        </p>
      </div>
      <div className="drawer_favorite_bar">
        <h3>Company Overview</h3>
        <PrimaryButton onClick={() => {}}>
          <HeartIcon width="16" height="16" /> <span>&nbsp;Follow</span>
        </PrimaryButton>
      </div>
      <CompanyTable company={fullCompany?.companyDetails} />
      <div className="drawer_company_headings">
        <h3
          className={`${showPeopleOrCharges ? "unselected" : ""}`}
          onClick={() => {
            setShowPeopleOrCharges(true);
          }}
        >
          People
        </h3>
        <h3
          className={`${showPeopleOrCharges ? "" : "unselected"}`}
          onClick={() => {
            setShowPeopleOrCharges(false);
          }}
        >
          Charges
        </h3>
      </div>
      {showPeopleOrCharges ? (
        <PeopleTable officers={fullCompany?.companyOfficers} />
      ) : (
        <ChargesTable charges={fullCompany?.companyCharges} />
      )}
    </div>
  );
}

export default CompanyDetails;
