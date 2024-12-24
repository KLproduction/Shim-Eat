// "use client"

// import { createContext, useContext, useState } from "react"

// export const AdminContext = createContext({
//     admin:false,
//     setAdmin:()=>{}
// })

// const AdminContextProvider = () => {
//     const [admin,setAdmin] = useState(false)
//   return (
//     <AdminContext.Provider value={{admin,setAdmin}}>
//         {children}
//     </AdminContext.Provider>
//   )
// }

// const useAdminContext  = () =>{
//     const context = useContext(AdminContext)
//     if(context === undefined){
//         throw new Error(
//             "useAdminContext must be used within a AdminContextProvider"
//         )
//     }
//     return context
// }

// export default AdminContextProvider
