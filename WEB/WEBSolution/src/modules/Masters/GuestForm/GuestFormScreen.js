import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import DisplayMessage from "../../../components/core/DisplayMessage";
import Loading from "../../../components/core/Loading";
import TextField from "../../../components/core/TextField";
import MultipleSelectionList from "../../../components/custom/MultipleSelectionList";

import Button from "../../../components/core/Button";
import { labels } from "../../../Config.json";

/**
 * @author Dileep Lohar
 */


export default function GuestFormScreen(props) {

    const guestId = props.match.params.id


    const [validationList, setValidationList] = useState({});
    const [selectedDisease, setSelectedDisease] = useState([]);
    const [loading, setLoading] = useState(false);
    const [diseaseList, setDiseaseList] = useState([])
    const [displayMessage, setDisplayMessage] = useState({});
    const [rowData, setRowData] = useState({});



    const checkAllValidation = () => {
        const comments = !validateField("comments");
        setValidationList({
            ...validationList,
            comments,
        });

        return !comments;
    };


    const validateField = (field) => {
        let isValid = true;
        if (
            !rowData[field] ||
            rowData[field] === "" ||
            rowData[field] === null ||
            rowData[field] === [] ||
            (rowData[field] && rowData[field].length === 0)
        ) {
            setValidationList({ ...validationList, [field]: true });
            isValid = false;
        } else {
            setValidationList({ ...validationList, [field]: false });
        }
        return isValid;
    };

    const getDiseaseList = () => {
        const params = {
            filterStatus: 1,
        };
        props.getDiseaseMaster({
            params,
            onSuccess: (response) => {
                const { diseaseMasterList = [] } = response;
                const data = diseaseMasterList.map((item, index) => ({
                    value: item.diseaseId,
                    label: item.diseaseName,
                }));
                setDiseaseList(data);
            },
            onFailure: ({ message }) => {
                setLoading(false);
            },
        });
    };


    const displayErrorMessage = (message) => {
        setDisplayMessage({
            open: true,
            displayMessage: message,
            severity: "error",
        });
    };

    useEffect(() => {
        getDiseaseList();
    }, [])



    const updateDisease = (e) => {
        if (checkAllValidation()) {
            setLoading(true);
            const params = {
                guestId,
                diseaseId: selectedDisease,
                comments: rowData.comments,
            };
            props.updateDiseaseList({
                params,
                onSuccess: ({ message: displayMessage }) => {
                    //   getDisease(e);
                    setLoading(false);
                    setDisplayMessage({
                        open: true,
                        displayMessage,
                        severity: "success",
                    });
                },
                onFailure: ({ message }) => {
                    setLoading(false);
                    displayErrorMessage(message);
                },
            });
        }
    };





    return (
        <div>
            {guestId !== "" &&
                <div style={{ display: "flex", flexDirection: "row", "margin": "5%" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                            <TextField
                                required={true}
                                value={rowData.comments}
                                label={"Comment"}
                                numeric={false}
                                isAutoFocus={false}
                                onChange={(e) => {
                                    setRowData({ ...rowData, comments: e.target.value });
                                    validateField("comments");
                                }}
                                error={validationList && validationList.comments ? true : false}
                                errorMessage={"Comments is Required"}
                                multiline={true}
                                rows={3}
                                maxLength={300}
                            />
                        </div>


                        <Grid style={{ "padding-top": "20px" }}>
                            <div>
                                <MultipleSelectionList
                                    items={diseaseList &&
                                        diseaseList.length > 0 &&
                                        diseaseList[0].value === "All"
                                        ? diseaseList.splice(0, 1)
                                        : diseaseList
                                    }
                                    keyField={"value"}
                                    textField={"label"}
                                    label={"Diseases"}
                                    columns={3}
                                    width={"100%"}
                                    checked={selectedDisease}
                                    setChecked={setSelectedDisease}
                                    required={true}
                                    disable={true}
                                />
                            </div>
                            <Grid item xs={12} style={{ justifyContent: "space", marginTop: "10px" }}>
                                <div className="d-flex align-items-center justify-content-end">
                                    <Button
                                        onClick={(e) => {

                                            updateDisease(e)
                                        }}
                                        customClass="button button-primary"
                                        label={labels.saveButton}
                                    />

                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    {loading && <Loading />}

                    <DisplayMessage
                        {...displayMessage}
                        onClose={() => setDisplayMessage({ open: false })}
                    />

                </div>
            }
        </div>
    );
}
