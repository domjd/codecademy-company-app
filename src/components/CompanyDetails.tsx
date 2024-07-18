import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import CompanyTable from "./CompanyTable";
import PrimaryButton from "./PrimaryButton";
import PeopleTable from "./PeopleTable";
import ChargesTable from "./ChargesTable";
import { useCompaniesContext, useUserContext } from "../hooks/hooks";
import { useState } from "react";
import {
  TCompanyType,
  TCompanyTypeExpanded,
  TRegisteredAddress,
} from "../types/types";
import Spinner from "./Spinner";

function CompanyDetails() {
  const { activeCompany, state } = useCompaniesContext();
  const { handleAddFollowedCompany, followedCompanies, isLoggedIn } =
    useUserContext();
  const [showPeopleOrCharges, setShowPeopleOrCharges] = useState(true);
  const isFollowedCompany = followedCompanies?.some(
    (c) => c.company_number === activeCompany?.companyDetails.company_number
  );

  if (!activeCompany && !state.isCompanyLoading) {
    return <h1>No Company Found</h1>;
  }

  const formatAddress = (address: TRegisteredAddress | null) => {
    const orderedKeys: Array<keyof TRegisteredAddress> = [
      "address_line_1",
      "address_line_2",
      "locality",
      "region",
      "postal_code",
      "country",
    ];

    if (address) {
      const resultString = orderedKeys
        .map((key) => address[key] || "")
        .filter((value) => value !== undefined && value !== "")
        .join(", ");

      return resultString;
    }

    return "";
  };

  return (
    <div className="drawer_contents">
      {state.isCompanyLoading ? (
        <Spinner width={100} height={100} />
      ) : (
        <>
          <div>
            <h2>{activeCompany?.companyDetails.company_name}</h2>
            <p className="drawer_company_number">
              {activeCompany?.companyDetails.company_number}
            </p>
          </div>
          <div className="drawer_favorite_bar">
            <h3>Company Overview</h3>
            <PrimaryButton
              isDisabled={!isLoggedIn}
              onClick={() =>
                handleAddFollowedCompany({
                  company_name: activeCompany?.companyDetails.company_name,
                  title: activeCompany?.companyDetails.company_name,
                  company_number: activeCompany?.companyDetails.company_number,
                  address_snippet: formatAddress(
                    activeCompany?.companyDetails.registered_office_address ||
                      null
                  ),
                } as TCompanyType)
              }
            >
              {isFollowedCompany ? <BookmarkFilledIcon /> : <BookmarkIcon />}
            </PrimaryButton>
          </div>
          <CompanyTable
            company={activeCompany?.companyDetails as TCompanyTypeExpanded}
          />
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
            <PeopleTable officers={activeCompany?.companyOfficers || []} />
          ) : (
            <ChargesTable charges={activeCompany?.companyCharges || []} />
          )}
        </>
      )}
    </div>
  );
}

export default CompanyDetails;
