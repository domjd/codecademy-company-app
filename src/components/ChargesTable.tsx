import { TCharges } from "../types/types";

type TChargesTableProps = {
  charges: TCharges[];
};

function ChargesTable({ charges }: TChargesTableProps) {
  if (charges?.length === 0) {
    return <h2 style={{ textAlign: "center" }}>No Charges Found</h2>;
  }
  return (
    <>
      {charges?.map((charge) => {
        return (
          <table key={charge?.id} className="company_table">
            <tbody>
              <tr>
                <td>Description</td>
                <td>{charge?.classification.description}</td>
              </tr>
              <tr>
                <td>Created On</td>
                <td>{charge?.created_on}</td>
              </tr>
              <tr>
                <td>Delivered On</td>
                <td>{charge?.delivered_on}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{charge?.status}</td>
              </tr>
              <tr>
                <td>Person Entitled</td>
                <td>{charge?.persons_entitled.map((p) => p.name + ", ")}</td>
              </tr>
            </tbody>
          </table>
        );
      })}
    </>
  );
}

export default ChargesTable;
