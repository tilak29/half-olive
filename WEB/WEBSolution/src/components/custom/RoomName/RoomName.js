import React from 'react'
import Roomdays from '../Roomdays/RoomdaysContainer';
import { Grid } from '@material-ui/core';

function RoomName(props) {

  return (
    <div>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {
          props.name.map((data, index) => {
            return (
              <div className='roomName'>
                <Grid item key={index} >

                  {data.categoryName}<br/>
                </Grid>
                <Roomdays days={props.days} occupancy={props.occupancy} index={index} />
              </div>
            )
          })
        }
      </Grid>
    </div>
  )
}

export default RoomName




// import React from 'react'
// import Roomdays from '../Roomdays/RoomdaysContainer'
// import Occupancy from '../Occupancy/OccupancyContainer'
// import { Grid } from '@material-ui/core';
// import { useState } from 'react';

// function Roomcategory(props) {
//   const [hide , sethide] = useState(true)
  
//   return (
//     <div>
//         <h4>CategoryName</h4>

//       <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//         {
//           props.name.map((data, index) => {
//             return (
//               <>
//       <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              
//       {
//         props.hide ? 
//         <>
//         <Grid item key={index} >
//           {data.categoryName}<br/>
//           {console.log("data",data)}
//         </Grid>
//         <Occupancy
//           {...props}
//           occupancy={props.occupancy}
//           index={index}
//           id={data.roomCategoryId}
//           />
// </>
//         :
//         <div className='roomName'>
// <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

//         <Grid item key={index}>
//         {data.categoryName}<br/>
      
//         <Roomdays days={props.days} occupancy={props.occupancy} index={index}/>
//       </Grid>
// </Grid>
//         </div>
//       }


//           </Grid>
//               </>
//             )
//           }
//           )
//         }
//         </Grid>
//         </div>
//         )
// }

// export default Roomcategory