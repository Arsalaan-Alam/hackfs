import React, { useRef, useState } from "react";

import { upload } from "@spheron/browser-upload";
import { Button, Spinner } from "flowbite-react";
import { usePrepareContractWrite,useContractWrite } from "wagmi";
import { collectorAbi,collectorAddress } from "@/contracts/constants";

function Upload(props) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadLink, setUploadLink] = useState("");
  const [uploadingPost,setUploadingPost] = useState(false);
  const idx = props.idx
  const [uri,setUri] = useState("")
  
  const { config } = usePrepareContractWrite({
    address: collectorAddress,
    abi: collectorAbi,
    functionName: 'createSubmission',
    // value:parseEther("0"),
    args: [idx,uri]
    
  })
  const { data:contractWite, write,isLoading:loadingContractWrite,isSuccess } = useContractWrite(config)

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
    setUploadLink("");

    handleUpload(selectedFile)
    
  };

    
  const handleSelectFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleUpload = async (file) => {
    if (!file) {
      return;
    }
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/UploadToken");
      console.log(response)
      const responseJson = await response.json();
      const uploadResult = await upload([file], {
        token: responseJson.uploadToken,
      });
      setUploadLink(`${uploadResult.protocolLink}/${file?.name}`);
      setUri(`${uploadResult.protocolLink}/${file?.name}`)
      console.log("uploaded....",uploadResult)
    } catch (err) {
      alert(err);
      setIsLoading(false)
    } finally {
      setIsLoading(false);
    }
  };




const UploadFileButton = <Button disabled={isLoading} onClick={handleSelectFile}>
<input
 id="file"
 type="file"
 ref={fileInputRef}
 onChange={handleFileChange}
 className="w-full h-full"
 style={{ display: "none" }}
 />
{isLoading ? <Spinner/> : 'Select File'}
</Button>


const UploadButton = <Button disabled={!write || loadingContractWrite} onClick={write}>
{loadingContractWrite ? <Spinner/> : isSuccess?"uploaded":"Upload Now"}
</Button>

      // <div>
      {/* {file && !isLoading &&<div className="bg-white dark:bg-gray-800 p-1">
        <img  className="m-auto rounded-lg max-h-80 max-w-1/2" src={uploadLink}/>
             </div>} */}
       {/* <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600"> */}

           {/* {(isLoading || uploadingPost) ? <Spinner/>: <button disabled={isLoading} type="submit" onClick={handleFileChange} class= " add-post-btn inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800" >
               Add Post
           </button>} */}

           if(uploadLink){
            return UploadButton
           }
           else{
            return UploadFileButton
           }
}

export default Upload;