
// "use client"
// import React, { useContext } from 'react';
// import { UserContext } from '@/context/userContext';


// const Profile = () => {
//   const { data, error, fetchDetails } = useContext(UserContext);

//   return (
//     <div>
//       <h1>Profile Page</h1>
//       {error && <p>{error}</p>}
//       {data ? (
//         <>
//           <p>Username: {data.userName}</p>
//           <p>Email: {data.email}</p>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//       <button onClick={fetchDetails}>Refresh</button>
//     </div>
//   );
// };

// export default Profile;
