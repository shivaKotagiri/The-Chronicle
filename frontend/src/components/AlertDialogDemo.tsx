  /* eslint-disable @typescript-eslint/no-explicit-any */
  import axios from "axios"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "../components/ui/alert-dialog"
  import { Button } from "./ui/button"
  import { useNavigate } from "react-router-dom"

  export function AlertDialogDemo() {
    const navigate = useNavigate();
    const handleDelete = async ():Promise<void> => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        await axios.delete(`${backendUrl}/api/v1/user/delete`,{
          headers:{
            Authorization: "Bearer"+" "+localStorage.getItem("token")
          }
        });

        localStorage.removeItem("token");
        navigate("/signup");
      }
      catch(e:any){
        console.log("The error is", e);
        alert("Something went Wrong with deletion, try again later");
      }
    }
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="text-gray-200" variant="outline">Delete Account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}  className="bg-red-700 hover:bg-red-800">Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
