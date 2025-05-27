import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from 'react-redux';

const Alert = () => {
  
  // const {error} = useSelector((state) => state.UserSlice);
  //  useEffect(()=>{
  //       if(error!=null){
  //         toast.success(error);
  //       }
  //  },[error])
  // const notify = () => toast.success("done...");

  return (
    <div>
      {/* <button onClick={notify} className="text-white">
        Make me a toast
      </button> */}
      <Toaster
        position="top-center"
        richColors
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 8000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </div>
  );
};
export default Alert;
