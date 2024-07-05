import { TOfficer } from "../types/types";

type TPeopleTableProps = {
  officers: TOfficer[];
};

function PeopleTable({ officers }: TPeopleTableProps) {
  if (officers?.length === 0) {
    return <h2 style={{ textAlign: "center" }}>No People Found</h2>;
  }
  return (
    <>
      {officers?.map((officer) => {
        return (
          <table key={officer?.name} className="company_table">
            <tbody>
              <tr>
                <td>Name</td>
                <td>{officer?.name}</td>
              </tr>
              <tr>
                <td>Officer Role</td>
                <td>{officer?.officer_role}</td>
              </tr>
              <tr>
                <td>Nationality</td>
                <td>{officer?.nationality}</td>
              </tr>
              <tr>
                <td>Date of Birth</td>
                <td>
                  {officer?.date_of_birth?.day} {officer?.date_of_birth?.month}{" "}
                  {officer?.date_of_birth?.year}
                </td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </>
  );
}

export default PeopleTable;
