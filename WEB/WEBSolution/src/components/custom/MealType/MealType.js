import React, { useState, useEffect } from 'react'
import MaterialTable from "material-table";
import TextField from '../../core/TextField';
import { style, options } from "../../../components/custom/GridConfig";

const MealType = (props) => {

    const [dietMealData, setDietMealData] = useState([]);
    const [displayMessage, setDisplayMessage] = useState({});
    const {
        onChange,
        showTitle = true,
        toolbar = true,
        value
    } = props;

    const columnsAddMeal = [
        {
            title: "Meal Name",
            field: "label",
            cellStyle: {
                textAlign: "center",
                width: "25% !important"
            }
        },
        {
            title: "Menu",
            field: "menu",
            render: ({ tableData: { id }, menu }) => {
                return (
                    <TextField
                        value={menu}
                        numeric={false}
                        isAutoFocus={false}
                        onChange={(e) => {
                            dietMealData[id].menu = e.target.value;
                            onChange(dietMealData.filter((item) => (item.menu != undefined && item.menu != '')));
                            setDietMealData(dietMealData);
                        }}
                        multiline={true}
                        placeholder={"Menu"}
                        isInline={true}
                        maxLength={250}
                    />
                );
            },
        },
    ];

    useEffect(() => {
        if (value != null && value != undefined) {
            setDietMealData(value);
        }
    }, [value]);

    const displayErrorMessage = (message) => {
        setDisplayMessage({
            open: true,
            displayMessage: message,
            severity: "error",
        });
    };

    const getMealTypeName = () => {
        props.getMealTypeName({
            onSuccess: (response) => {
                const { mealTypeList } = response;
                setDietMealData(mealTypeList);
            },
            onFailure: ({ message }) => {
                displayErrorMessage(message);
            },
        });
    };

    useEffect(() => {
        getMealTypeName();
    }, [])

    return (
        <div className={showTitle ? "" : 'mt-3'}>
            <MaterialTable
                title={"Add Meal"}
                columns={columnsAddMeal}
                data={dietMealData}
                style={style}
                options={{
                    ...options,
                    headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                    },
                    paging: false,
                    search: false,
                    toolbar: toolbar,
                    showTitle: showTitle
                }}
            />
        </div>
    );
}

export default MealType;