import "./App.css";
import Navbar from "./layout/Navbar/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import { routes } from "./utils/routes";
import ListData from "./features/ListData/ListData";
import AddData from "./features/AddData/AddData";
import EditData from "./features/EditData/EditData";

function App() {
  return (
    <div className="bg-white min-h-screen">
      <BrowserRouter>
        <Navbar />
        <Route exact path={routes.add}>
          <AddData />
        </Route>
        <Route exact path={routes.list}>
          <ListData />
        </Route>
        <Route path={routes.edit} component={EditData} />
      </BrowserRouter>
    </div>
  );
}

export default App;
