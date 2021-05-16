import React from "react";

interface ProjectsItem {
  id: number;
  name: string;
}

interface List {
  list: User[];
  users: ProjectsItem[];
}

interface User {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}

const List = ({ list, users }: List) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list?.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {users?.find((user) => user.id === project.personId)?.name ||
                "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default List;
