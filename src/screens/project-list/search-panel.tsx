import React from "react";

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: any;
}
interface User {
  id: string;
  name: string;
}

const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => (
  <form action="">
    <div>
      <input
        value={param.name}
        onChange={(evt) => setParam({ ...param, name: evt.target.value })}
      />
      <select
        value={param.personId}
        onChange={(evt) => setParam({ ...param, personId: evt.target.value })}
      >
        <option value="">负责人</option>
        {users.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  </form>
);
export default SearchPanel;
