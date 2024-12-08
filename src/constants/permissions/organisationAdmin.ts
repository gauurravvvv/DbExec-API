export const ORG_ADMIN_PERMISSIONS = [
  {
    label: "Dashboard",
    value: "adminDashboard",
    status: true,
    icon: "fas fa-house",
  },
  {
    label: "System Management",
    value: "systemManagement",
    status: true,
    icon: "fas fa-users-cog",
    subPermissions: [
      {
        label: "Organisation Admin",
        value: "orgAdmin",
        status: true,
        icon: "fas fa-user-tie",
      },
      {
        label: "Users",
        value: "userManagement",
        status: true,
        icon: "fas fa-users",
      },
    ],
  },
  {
    label: "Databse Management",
    value: "databaseManagement",
    status: true,
    icon: "fas fa-database",
    subPermissions: [
      {
        label: "Setup DB",
        value: "setupDB",
        status: true,
        icon: "fas fa-wrench",
      },
      {
        label: "Configure DB",
        value: "configureDB",
        status: true,
        icon: "fas fa-sliders",
        subPermissions: [
          {
            label: "Schema",
            value: "dbSchema",
            status: true,
            icon: "fas fa-file-lines",
          },
          {
            label: "Role",
            name: "dbRole",
            status: true,
            icon: "fas fa-shield-halved",
          },
          {
            label: "Table",
            name: "dbTable",
            status: true,
            icon: "fas fa-table-cells",
          },
        ],
      },
    ],
  },
  {
    label: "Query Executer",
    value: "qExecutor",
    status: true,
    icon: "fas fa-bold",
  },
  {
    label: "My Profile",
    value: "myProfile",
    status: true,
    icon: "fas fa-user",
  },
];
