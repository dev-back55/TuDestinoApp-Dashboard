export const userColumns = [
  // { field: "_id", headerName: "ID", width: 70 },
  {
    field: "username",
    headerName: "Nombre",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },

  {
    field: "country",
    headerName: "País",
    width: 100,
  },
  {
    field: "city",
    headerName: "Ciudad",
    width: 170,
  },
  {
    field: "phone",
    headerName: "Teléfono",
    width: 150,
  },
  {
    field: "isActive",
    headerName: "Activo",
    type: "boolean",
    editable: true,
    width: 100,
  },
  {
    field: "isAdmin",
    headerName: "Admin",
    type: "boolean",
    editable: true,
    width: 100,
  },
];

export const productColumns = [
  // { field: "_id", headerName: "ID", width: 250 },
  {
    field: "title",
    headerName: "Producto",
    width: 230,
  },
  {
    field: "productType",
    headerName: "Tipo",
    type: "singleSelect", valueOptions:["house", "apartment", "bedroom"],editable: true,
    width: 120,
  },
  {
    field: "price",
    headerName: "Precio",
    width: 130,
  },
  {
    field: "city",
    headerName: "Ciudad",
    width: 200,
  },
  {
    field: "country",
    headerName: "País",
    width: 100,
  },
  {
  field: "numberBedrom",
  headerName: "Habit",
  width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];
