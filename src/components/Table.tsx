import { TTableData } from "../types/types";

type TTableProps = {
  data: object;
};

function Table({ data }: TTableProps) {
  return (
    <table className="company_table">
      <tbody>
        {Object.keys(data).map((tableItem) => {
          return (
            <tr>
              <td>{tableItem}</td>
              <td>{data[tableItem]}</td>
            </tr>
          );
        })}
        {/* <tr>
          <td>Company status</td>
          <td>Dissolved</td>
        </tr>
        <tr>
          <td>Company type</td>
          <td>Private limited Company</td>
        </tr>
        <tr>
          <td>Nature of Business</td>
          <td>64999 - Financial intermediation not elsewhere classified</td>
        </tr>
        <tr>
          <td>Incorporated on</td>
          <td>16 May 2012</td>
        </tr>
        <tr>
          <td>Dissolved on</td>
          <td>22 May 2018</td>
        </tr> */}
      </tbody>
    </table>
  );
}

export default Table;
