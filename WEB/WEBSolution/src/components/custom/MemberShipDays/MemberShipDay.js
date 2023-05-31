import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';

export default function MemberShipDays(props) {

    const Data = ["30 Days", "60 Days","90 Days"]
    const [roomList, setRoomList] = useState()

    return (
        <div>
            <Grid container spacing={2} columns={12 }>
            {
                Data.map((data) => {
                    return (
                        <Grid item xs={2} sm={4} md={4} >
                        <div>{data}</div>
                        </Grid>
                    )
                })
            }
            </Grid>
        </div >
    )
}
