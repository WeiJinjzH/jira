import React, { useEffect, useState } from "react";
import qs from "qs";
import { cleanObject, useMount, useDebounce } from "../../utils";
import List from "./list";
import SearchPanel from "./search-panel";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectListScreen = () => {
  const [list, setList] = useState([]);
  const [param, setParam] = useState({ name: "", personId: "" });
  const [users, setUsers] = useState([]);

  const debounceParams = useDebounce(param, 800);
  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParams))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceParams]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
export default ProjectListScreen;
