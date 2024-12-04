export const SUPER_ADMIN_PERMISSIONS = [
  {
    label: "System Management",
    value: "systemManagement",
    status: true,
    subPermissions: [
      {
        label: "Super Admin",
        value: "superAdmin",
        status: true,
        subPermissions: [
          { label: "Add", value: "addSuperAdmin", status: true },
          { label: "Update", value: "updateSuperAdmin", status: true },
          { label: "View", value: "viewSuperAdmin", status: true },
          { label: "Delete", value: "deleteSuperAdmin", status: true },
        ],
      },
      {
        label: "Organisation Management",
        value: "orgManagement",
        status: true,
        subPermissions: [
          { label: "Add", value: "addOrganisation", status: true },
          { label: "Update", value: "updateOrganisation", status: true },
          { label: "View", value: "viewOrganisation", status: true },
          { label: "Delete", value: "deleteOrganisation", status: true },
        ],
      },
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
  { label: "Query Executer", value: "qExecutor", status: true },
];
