import { lazy } from "react";

function importView(...args) {
  const path = args
    .map((arg) => {
      if (Array.isArray(arg)) {
        const nestPath = new Array(arg[1])
          .fill(0)
          .map(() => arg[0])
          .join("/");
        arg = nestPath;
      }
      return arg;
    })
    .join("/");
  return import(`../views/${path}.js`);
}

export const mainRoutes = [
  {
    path: `/home`,
    component: lazy(() => importView(["Home", 2])),
  },
  {
    path: `/liveEditor`,
    component: lazy(() => importView(["LiveEditor", 2])),
  },
  {
    path: `/dataTable`,
    component: lazy(() => importView("DataTable", "routes")),
    routes: [
      {
        path: `/dataTable/filters`,
        component: lazy(() => importView("DataTable", "Filters")),
      },
      {
        path: `/dataTable/excel`,
        component: lazy(() => importView("DataTable", "ExcelDownload")),
      },
      {
        path: `/dataTable/csv`,
        component: lazy(() => importView("DataTable", "CsvDownload")),
      },
    ],
  },
  {
    path: `/users`,
    component: lazy(() => importView(["Users", 2])),
  },
];
