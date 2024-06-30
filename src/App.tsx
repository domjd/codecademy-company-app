import { HeartIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

function App() {
  return (
    <main>
      {/* Company Details Drawer */}
      <div className="drawer_container drawer_container--isopen">
        <div className="drawer_contents">
          <div>
            <h2>NEW HORIZON FINANCE LTD</h2>
            <p className="drawer_company_number">08071525</p>
          </div>
          <div className="drawer_favorite_bar">
            <h3>Company Overview</h3>
            <button className="primary_button">
              <HeartIcon width="16" height="16" /> <span>&nbsp;Follow</span>
            </button>
          </div>
          <table className="company_table">
            <tbody>
              <tr>
                <td>Company status</td>
                <td>Dissolved</td>
              </tr>
              <tr>
                <td>Company type</td>
                <td>Private limited Company</td>
              </tr>
              <tr>
                <td>Nature of Business</td>
                <td>
                  64999 - Financial intermediation not elsewhere classified
                </td>
              </tr>
              <tr>
                <td>Incorporated on</td>
                <td>16 May 2012</td>
              </tr>
              <tr>
                <td>Dissolved on</td>
                <td>22 May 2018</td>
              </tr>
            </tbody>
          </table>
          <div className="drawer_company_headings">
            <h3>People</h3>
            <h3>Charges</h3>
          </div>
          <table className="company_table">
            <tbody>
              <tr>
                <td>Name</td>
                <td>DUDLEY, Ian David</td>
              </tr>
              <tr>
                <td>Officer Role</td>
                <td>Director</td>
              </tr>
              <tr>
                <td>Nationality</td>
                <td>British</td>
              </tr>
              <tr>
                <td>Date of Birth</td>
                <td>October 1962</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <h1 className="main_title">Companies House Search</h1>
      {/* Form Section */}
      <form className="company_search_form" action="">
        <div className="company_search">
          <input
            type="text"
            name="company_search"
            id="company_search_input"
            placeholder="Search For Company"
          />
          <MagnifyingGlassIcon width="24" height="24" id="search_icon" />
        </div>
      </form>

      {/* Results Section */}
      <div className="results">
        <ul className="results_list">
          <li className="results_list_item">
            <div className="results_list_item_details">
              <h3 className="results_list_item_company_name">
                NEW HORIZON FINANCE LTD
              </h3>
              <p className="results_list_item_company_number">08071525</p>

              <p className="results_list_item_subtitle">
                137 Harrow View, Harrow, Middlesex, HA1 4SX
              </p>
            </div>
            <button className="primary_button">More Info</button>
          </li>
        </ul>
      </div>
    </main>
  );
}

export default App;
