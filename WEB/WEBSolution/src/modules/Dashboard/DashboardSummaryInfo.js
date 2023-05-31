import React, { useEffect, useState } from "react";

//added by Niraj (importing icons for highlighted cards)
import MonthlyPOBIcon from "../../Images/monthlyPOB.svg";
import MonthlyProductiveCallIcon from "../../Images/monthlyProductiveCall.svg";
import MonthlyTotalCallIcon from "../../Images/monthlyTotalCall.svg";

/**
 * Display Monthly Summary of Work on Dashboard (Not for Admin)
 * SL- own data, Manager - Subordinates data
 * @author Tejal Sali
 */
export default function DashboardSummaryInfo(props) {
  const [summaryData, setSummaryData] = useState({});
  const [orderSummaryData, setOrderSummaryData] = useState({});
  const [displaySummary, setDisplaySummary] = useState(false);
  const [displayOrderSummary, setDisplayOrderSummary] = useState(false);

  useEffect(() => {
    getDashboardSummaryData();
    getOrderMonthlyCountData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDashboardSummaryData = () => {
    props.getDashboardSummaryData({
      onSuccess: response => {
        setDisplaySummary(true);
        const { callDetails } = response;
        setSummaryData(callDetails);
      },
      onFailure: ({ message, statusCode }) => {
        if(statusCode === 401)
        {
          setDisplaySummary(false);
        }
        else{
          props.setDisplayMessage({
            open: true,
            displayMessage: message,
            severity: "error"
          });  
        }
      }
    });
  };

  const getOrderMonthlyCountData = () => {
    props.getOrderMonthlyCountData({
      onSuccess: response => {
        setDisplayOrderSummary(true);
        const { monthlyStatusList } = response;
        setOrderSummaryData(monthlyStatusList[0]);
      },
      onFailure: ({ message, statusCode }) => {
        if(statusCode === 401)
        {
          setDisplayOrderSummary(false);
        }
        else{
          props.setDisplayMessage({
            open: true,
            displayMessage: message,
            severity: "error"
          });  
        }
      }
    });
  };

  const PobUI = (displaySummary && (
    <div className="row">
      <div className="col-12 col-sm-6 col-md-4 mb-3">
        <div className="card highlighted-card">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <img
                className="img-fluid"
                alt="Monthly Total Calls"
                src={MonthlyTotalCallIcon}
              />
            </div>
            <div className="text-right d-flex flex-column align-items-end">
              <div className="highlighted-card-title text-red h3 mb-0">
                {summaryData.totalCall}
              </div>
              <div className=" highlighted-card-subtitle mb-0">
                Monthly Total Calls
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-4 mb-3">
        <div className="card highlighted-card">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <img
                className="img-fluid"
                alt="Monthly Productive Calls"
                src={MonthlyProductiveCallIcon}
              />
            </div>
            <div className="text-right d-flex flex-column align-items-end">
              <div className="highlighted-card-title text-blue h3 mb-0">
                {summaryData.productiveCall}
              </div>
              <div className="highlighted-card-subtitle mb-0">
                Monthly Productive Calls
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-4 mb-3">
        <div className="card highlighted-card">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <img
                className="img-fluid"
                alt="Monthly POB"
                src={MonthlyPOBIcon}
              />
            </div>
            <div className="text-right d-flex flex-column align-items-end">
              <div className="highlighted-card-title text-orange h3 mb-0">
                ₹{summaryData.pob}
              </div>
              <div className="highlighted-card-subtitle mb-0">Monthly POB</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  const OrderUI = (displayOrderSummary && (
    <div className="row">
      <div className="col-12 col-sm-6 col-md-4 mb-3">
        <div className="card highlighted-card">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <img
                className="img-fluid"
                alt="Pending Orders"
                src={MonthlyTotalCallIcon}
              />
            </div>
            <div className="text-right d-flex flex-column align-items-end">
              <div className="highlighted-card-title text-red h3 mb-0">
                {orderSummaryData.pendingOrders}
              </div>
              <div className=" highlighted-card-subtitle mb-0">
                No. of Pending Orders
              </div>
            </div>
          </div>
        </div>
      </div>

     

      <div className="col-12 col-sm-6 col-md-4 mb-3">
        <div className="card highlighted-card">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <img
                className="img-fluid"
                alt="Supplied Orders"
                src={MonthlyProductiveCallIcon}
              />
            </div>
            <div className="text-right d-flex flex-column align-items-end">
              <div className="highlighted-card-title text-blue h3 mb-0">
                {orderSummaryData.supplyedOrders}
              </div>
              <div className="highlighted-card-subtitle mb-0">
                No. of Supplied Orders
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="col-12 col-sm-6 col-md-4 mb-3">
        <div className="card highlighted-card">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <img
                className="img-fluid"
                alt="Total Orders"
                src={MonthlyPOBIcon}
              />
            </div>
            <div className="text-right d-flex flex-column align-items-end">
              <div className="highlighted-card-title text-orange h3 mb-0">
                {orderSummaryData.receivedOrders}
              </div>
              <div className="highlighted-card-subtitle mb-0">No. of Total Orders</div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-4 mb-3">
        <div className="card highlighted-card">
          <div className="d-flex justify-content-between align-items-center">
            {/* <div>
              <img
                className="img-fluid"
                alt="Pending Orders"
                src={MonthlyTotalCallIcon}
              />
            </div> */}
             <div class="ml-3 align-self-center" >
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="rupee-sign" class="svg-inline--fa fa-rupee-sign fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z"></path></svg>
            </div>
            <div className="text-right d-flex flex-column align-items-end">
              <div className="highlighted-card-title text-red h3 mb-0">
                {orderSummaryData.pendingOrderAmount}
              </div>
              <div className=" highlighted-card-subtitle mb-0">
                Amount of Pending Orders
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-sm-6 col-md-4 mb-3">
        <div className="card highlighted-card">
          <div className="d-flex justify-content-between align-items-center">
            {/* <div>
              <img
                className="img-fluid"
                alt="Supplied Orders"
                src={MonthlyProductiveCallIcon}
              />
            </div>
             */}
              <div class="ml-3 align-self-center" >
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="rupee-sign" class="svg-inline--fa fa-rupee-sign fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z"></path></svg>
            </div>
            <div className="text-right d-flex flex-column align-items-end">
              <div className="highlighted-card-title text-blue h3 mb-0">
                {orderSummaryData.supplyedOrderAmount}
              </div>
              <div className="highlighted-card-subtitle mb-0">
                Amount of Supplied Orders
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-4 mb-3">
        <div className="card highlighted-card">
          <div className="d-flex justify-content-between align-items-center">
            {/* <div>
              <img
                className="img-fluid"
                alt="Total Orders"
                src={MonthlyPOBIcon}
              />
            </div> */}
             <div class="ml-3 align-self-center" >
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="rupee-sign" class="svg-inline--fa fa-rupee-sign fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M308 96c6.627 0 12-5.373 12-12V44c0-6.627-5.373-12-12-12H12C5.373 32 0 37.373 0 44v44.748c0 6.627 5.373 12 12 12h85.28c27.308 0 48.261 9.958 60.97 27.252H12c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h158.757c-6.217 36.086-32.961 58.632-74.757 58.632H12c-6.627 0-12 5.373-12 12v53.012c0 3.349 1.4 6.546 3.861 8.818l165.052 152.356a12.001 12.001 0 0 0 8.139 3.182h82.562c10.924 0 16.166-13.408 8.139-20.818L116.871 319.906c76.499-2.34 131.144-53.395 138.318-127.906H308c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12h-58.69c-3.486-11.541-8.28-22.246-14.252-32H308z"></path></svg>
            </div>
            <div className="text-right d-flex flex-column align-items-end">
              <div className="highlighted-card-title text-orange h3 mb-0">
                {orderSummaryData.receivedOrderAmount}
              </div>
              <div className="highlighted-card-subtitle mb-0">Amount of Total Orders</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    
  ));

  return displaySummary == true ? PobUI : OrderUI;

}
