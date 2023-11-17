import {
  Home,
  Tune,
  BorderColor,
  PeopleAlt,
  MenuBook,
  ImportContacts,
  PostAdd,
} from "@material-ui/icons";

export const mainNavigation = [
  {
    name: "Home",
    icon: Home,
    url: `/home`,
  },
  {
    name: "LiveEditor",
    icon: BorderColor,
    url: `/liveEditor`,
  },
  {
    name: "Data Table",
    icon: ImportContacts,
    url: `/dataTable`,
    navigationData: [
      {
        name: "Filters",
        icon: Tune,
        url: `/dataTable/filters`,
      },
      {
        name: "Excel Download",
        icon: MenuBook,
        url: `/dataTable/excel`,
      },
      {
        name: "Csv Download",
        icon: PostAdd,
        url: `/dataTable/csv`,
      },
    ],
  },
  {
    name: "Users",
    icon: PeopleAlt,
    url: `/users`,
  },
];
