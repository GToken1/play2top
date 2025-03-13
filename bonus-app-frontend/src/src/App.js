import * as React from "react";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./Register";
import UsersList from "./UsersList";

const dataProvider = simpleRestProvider("http://localhost:5001");

const App = () => (
  <Router>
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/admin" style={{ marginRight: "10px" }}>Admin Panel</Link>
      <Link to="/register">Register</Link>
    </nav>
    <Routes>
      <Route
        path="/admin/*"
        element={
          <Admin dataProvider={dataProvider}>
            <Resource name="users" list={UsersList} />
          </Admin>
        }
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={<h1 style={{ padding: "20px" }}>Welcome to Bonus App</h1>}
      />
    </Routes>
  </Router>
);

export default App;