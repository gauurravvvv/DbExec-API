export const ORG_ADMIN_PERMISSIONS = [
  {
    label: "System Management",
    value: "systemManagement",
    status: true,
    subPermissions: [
      {
        label: "Organisation Admin",
        value: "orgAdmin",
        status: true,
        subPermissions: [
          { label: "Add", value: "addOrgAdmin", status: true },
          { label: "Update", value: "updateOrgAdmin", status: true },
          { label: "View", value: "viewOrgAdmin", status: true },
          { label: "Delete", value: "deleteOrgAdmin", status: true },
        ],
      },
      {
        label: "User Management",
        value: "userManagement",
        status: true,
        subPermissions: [
          { label: "Add", value: "addUser", status: true },
          { label: "Update", value: "updateUser", status: true },
          { label: "View", value: "viewUser", status: true },
          { label: "Delete", value: "deleteUser", status: true },
        ],
      },
    ],
  },
  {
    label: "Databse Management",
    value: "databaseManagement",
    status: true,
    subPermissions: [
      {
        label: "Setup DB",
        value: "setupDB",
        status: true,
        subPermissions: [
          { label: "Create", value: "createDb", status: true },
          { label: "View", value: "viewDb", status: true },
          { label: "Delete", value: "deleteDb", status: true },
        ],
      },
      {
        label: "Configure DB",
        value: "configureDB",
        status: true,
        subPermissions: [
          {
            label: "Schema",
            value: "dbSchema",
            status: true,
            subPermissions: [
              { label: "Create", value: "createDbSchema", status: true },
              { label: "Modify", value: "modifyDbSchema", status: true },
              { label: "View", value: "viewDbSchema", status: true },
            ],
          },
          {
            label: "Role",
            value: "dbRole",
            status: true,
            subPermissions: [
              { label: "Create", value: "createDbRole", status: true },
              { label: "Modify", value: "modifyDbRole", status: true },
              { label: "View", value: "viewDbRole", status: true },
            ],
          },
          {
            label: "Table",
            value: "dbTable",
            status: true,
            subPermissions: [
              { label: "Create", value: "createDbTable", status: true },
              { label: "Modify", value: "modifyDbTable", status: true },
              { label: "View", value: "viewDbTable", status: true },
            ],
          },
        ],
      },
    ],
  },
  { label: "Query Executer", value: "qExecutor", status: true },
];
