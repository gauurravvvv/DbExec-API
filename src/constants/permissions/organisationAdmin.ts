export const ORG_ADMIN_PERMISSIONS = [
  {
    label: "System Management",
    name: "systemManagement",
    status: true,
    subPermissions: [
      {
        label: "Organisation Admin",
        name: "orgAdmin",
        status: true,
        subPermissions: [
          { label: "Add", name: "addOrgAdmin", status: true },
          { label: "Update", name: "updateOrgAdmin", status: true },
          { label: "View", name: "viewOrgAdmin", status: true },
          { label: "Delete", name: "deleteOrgAdmin", status: true },
        ],
      },
      {
        label: "User Management",
        name: "userManagement",
        status: true,
        subPermissions: [
          { label: "Add", name: "addUser", status: true },
          { label: "Update", name: "updateUser", status: true },
          { label: "View", name: "viewUser", status: true },
          { label: "Delete", name: "deleteUser", status: true },
        ],
      },
    ],
  },
  {
    label: "Databse Management",
    name: "databaseManagement",
    status: true,
    subPermissions: [
      {
        label: "Setup DB",
        name: "setupDB",
        status: true,
        subPermissions: [
          { label: "Create", name: "createDb", status: true },
          { label: "View", name: "viewDb", status: true },
          { label: "Delete", name: "deleteDb", status: true },
        ],
      },
      {
        label: "Configure DB",
        name: "configureDB",
        status: true,
        subPermissions: [
          {
            label: "Schema",
            name: "dbSchema",
            status: true,
            subPermissions: [
              { label: "Create", name: "createDbSchema", status: true },
              { label: "Modify", name: "modifyDbSchema", status: true },
              { label: "View", name: "viewDbSchema", status: true },
            ],
          },
          {
            label: "Role",
            name: "dbRole",
            status: true,
            subPermissions: [
              { label: "Create", name: "createDbRole", status: true },
              { label: "Modify", name: "modifyDbRole", status: true },
              { label: "View", name: "viewDbRole", status: true },
            ],
          },
          {
            label: "Table",
            name: "dbTable",
            status: true,
            subPermissions: [
              { label: "Create", name: "createDbTable", status: true },
              { label: "Modify", name: "modifyDbTable", status: true },
              { label: "View", name: "viewDbTable", status: true },
            ],
          },
        ],
      },
    ],
  },
  { label: "Query Executer", name: "qExecutor", status: true },
];
