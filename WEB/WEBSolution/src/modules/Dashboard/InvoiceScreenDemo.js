import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { AddBox, Edit } from "@material-ui/icons";
import { IconButton, Tooltip } from "@material-ui/core";

import TextField from "../../components/core/TextField";
import { GridIcons, options, style } from "../../components/custom/GridConfig";
import DialogControl from "../../components/core/Dialog";

export default function InvoiceScreenDemo() {
  const [data, setData] = useState([]);
  const [itemDialog, toggleItemDialog] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(false);

  useEffect(() => {
    insertRow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const insertRow = () => {
    const row = {
      srNo: data.length + 1,
      itemId: null,
      name: null,
      quantity: null,
    };

    const dummyData = [...data];
    dummyData.push(row);
    setData(dummyData);
  };

  const columns = [
    { title: "Sr.No", field: "srNo" },
    {
      title: "Item",
      field: "name",
      render: ({ tableData: { id }, name }) => {
        return (
          <div className="d-flex align-items-center">
            <TextField
              value={name}
              isAutoFocus={true}
              onChange={(e) => {
                data[id].name = e.target.value;
                setData(data);
              }}
              placeholder={"0"}
              isInline={true}
              maxLength={10}
              inputProps={{ tabIndex: `${(id + 1) * 2}` }}
              onKeyUp={(event) => {
                if (event.keyCode === 13) {
                  setSelectedIndex(id);
                  toggleItemDialog(true);
                }
              }}
            />
            <Tooltip title="Edit Item">
              <IconButton
                aria-label="edit"
                onClick={() => {
                  setSelectedIndex(id);
                  toggleItemDialog(true);
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: "Quantity",
      field: "quantity",
      render: ({ tableData: { id }, quantity }) => {
        return (
          <TextField
            value={quantity}
            numeric={true}
            isAutoFocus={false}
            onChange={(e) => {
              data[id].quantity = e.target.value;
              setData(data);
            }}
            placeholder={"0"}
            isInline={true}
            maxLength={10}
            inputProps={{ tabIndex: `${(id + 1) * 2}` }}
            onKeyUp={(event) => {
              if (event.keyCode === 13) insertRow();
            }}
          />
        );
      },
    },
  ];

  const dialogContent = (
    <MaterialTable
      icons={GridIcons}
      title={``}
      columns={[
        { title: "Sr.No", field: "itemId" },
        { title: "Item Name", field: "name" },
      ]}
      data={[
        { itemId: 1, name: "CETIRIZINE 10MG" },
        { itemId: 2, name: "PAIN KILLER SPRAY" },
        { itemId: 3, name: "FLUCONAZOLE 150MG" },
        { itemId: 4, name: "ENERGY SUPPLIMENT" },
        { itemId: 5, name: "AMOXICILLIN 250MG" },
      ]}
      style={style}
      options={{
        ...options,
        paging: false,
        searchAutoFocus: true,
        searchFieldAlignment: "left",
      }}
      onRowClick={(event, rowData) => {
        const dummyData = [...data];
        dummyData[selectedIndex].itemId = rowData.itemId;
        dummyData[selectedIndex].name = rowData.name;
        setData(dummyData);

        toggleItemDialog(false);
      }}
    />
  );

  return (
    <div className="card">
      <div className="table-wrapper editable-table-wrapper">
        <MaterialTable
          icons={GridIcons}
          title={`Invoice Screen`}
          columns={columns}
          data={data}
          style={style}
          options={{
            ...options,
            paging: false,
            search: false,
          }}
          actions={[
            {
              icon: () => {
                return (
                  <AddBox
                    onClick={() => {
                      insertRow();
                    }}
                  />
                );
              },
              tooltip: "Add Item",
              isFreeAction: true,
            },
          ]}
        />

        {itemDialog && (
          <DialogControl
            open={itemDialog}
            dialogTitleText={`Select Item`}
            dialogContent={dialogContent}
            onCancel={() => {
              toggleItemDialog(false);
            }}
            cancelAction={false}
            submitAction={false}
            // fullWidth="true"
          />
        )}
      </div>
    </div>
  );
}
