import React from "react";
import { useEffect, useState } from "react";
import { Form, Input } from "antd";
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

  const handleInvitationCode = (rule: any, value: any, callback: any) => {
    // 短信邀请码
    fetch(`${apiUrl}/users11`)
      .then((res) => {
        if (res.ok) {
          console.log(1);
          callback();
        } else {
          callback(new Error("11182939231"));
        }
      })
      .catch((error) => {
        callback("2222");
      });
  };

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
      <Form>
        <Form.Item
          label="Input"
          name="Input"
          rules={[
            { message: "111" },
            {
              validator: handleInvitationCode,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};
export default ProjectListScreen;
