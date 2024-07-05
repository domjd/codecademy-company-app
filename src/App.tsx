import Drawer from "./components/Drawer";
import Header from "./components/Header";
import ResultsList from "./components/ResultsList";
import SearchForm from "./components/SearchForm";

function App() {
  return (
    <main>
      {/* Company Details Drawer */}
      <Drawer />
      <Header />
      <h1 className="main_title">Companies House Search</h1>
      {/* Form Section */}
      <SearchForm />

      {/* Results Section */}
      <ResultsList />
    </main>
  );
}

export default App;
