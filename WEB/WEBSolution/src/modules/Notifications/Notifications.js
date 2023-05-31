import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";

export default function Notifications(props) {
  const [notificationsData, setNotificationsData] = useState([]);

  const { userData } = props;

  useEffect(() => {
    getNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNotifications = () => {
    const params = {
      isAdmin: 0,
      loggedInEmployeeId: userData.authInfo.loggedInEmployeeId,
      page: null,
      pageSize: null,
      orderBy: null,
      orderDirection: null,
      search: null,
    };
    props.getNotifications({
      params,
      onSuccess: (response) => {
        const { notificationList } = response;
        setNotificationsData(notificationList);
        props.setTotalNotifications(0);
      },
      onFailure: ({ message }) => {
        props.setDisplayMessage({
          open: true,
          displayMessage: message,
          severity: "error",
        });
      },
    });
  };

  return (
    <React.Fragment>
      {notificationsData.length === 0 ? (
        <List className="p-0" dense>
          <ListItem>
            <ListItemText primary="No Notification" />
          </ListItem>
        </List>
      ) : (
        <div style={{ maxHeight: "50vh", overflow: "auto" }}>
          <List className="p-0" dense>
            {notificationsData.map((notification) => (
              <ListItem>
                <ListItemText
                  primary={notification.notificationMessage}
                  secondary={notification.notificationTime}
                  className="notification-item"
                />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </React.Fragment>
  );
}
