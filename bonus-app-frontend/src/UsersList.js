import React from 'react';
import { List, Datagrid, TextField, NumberField } from 'react-admin';

const UsersList = (props) => (
  <List {...props}>
    <Datagrid rowClick={false}>
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="password" />
      <NumberField source="bonus" />
    </Datagrid>
  </List>
);

export default UsersList;