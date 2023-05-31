import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";

import Loading from "../../../components/core/Loading";

import BroadcastIcon from "../../../Images/broadcastIcon.svg";

export default function BroadcastMobileNewsNotification(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isAllowNews, setIsAllowNews] = useState(false);

  useEffect(() => {
    getBroadcastMobileNewsList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBroadcastMobileNewsList = () => {
    setLoading(true);

    props.getBroadcastMobileNewsList({
      onSuccess: (response) => {
        setLoading(false);
        const { broadcastMobileNewsList = [] } = response;
        setIsAllowNews(broadcastMobileNewsList[0].isAllowBroadCast === 1);
        setData([...broadcastMobileNewsList]);
      },
      onFailure: ({ message }) => {
        setLoading(false);
      },
    });
  };

  return (
    <div>
      {data.length !== 0 && isAllowNews ? (
        <div className="holiday-wrapper">
          <div className="card selection-card selection-card-two-columns mb-3">
            <Grid container spacing={3}>
              <div className="d-flex align-items-center">
                <div>
                  <img
                    src={BroadcastIcon}
                    alt="Broadcast Mobile News"
                    className="mr-2 ml-2"
                  />
                </div>
                <div>{data[0].message}</div>
              </div>
            </Grid>
          </div>
        </div>
      ) : null}
      {loading && <Loading />}
    </div>
  );
}
