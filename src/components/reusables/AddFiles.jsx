/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import { BiSolidImageAdd } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa"; 
import folderIcon from "../../assets/folder-open.svg"

const AddFiles = ({ onFilesChange }) => {
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const maxFilesAllowed = 1; // Adjust based on your needs
        const totalFiles = selectedFiles.length + files.length;

        if (totalFiles > maxFilesAllowed) {
            alert(`You can only upload ${maxFilesAllowed} file(s).`);
            return;
        }

        const filePreviews = files.map((file) => ({
            id: URL.createObjectURL(file),
            file,
            name: file.name, // Store file name for PDF display
        }));

        const updatedFiles = [...selectedFiles, ...filePreviews];
        setSelectedFiles(updatedFiles);
        onFilesChange(updatedFiles);
    };

    const handleRemoveFile = (index) => {
        setSelectedFiles((prevFiles) => {
            const updatedFiles = [...prevFiles];
            URL.revokeObjectURL(updatedFiles[index].id);
            updatedFiles.splice(index, 1);
            onFilesChange(updatedFiles);
            return updatedFiles;
        });
    };

    useEffect(() => {
        return () => {
            selectedFiles.forEach((fileData) =>
                URL.revokeObjectURL(fileData.id)
            );
        };
    }, [selectedFiles]);

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                accept="application/pdf" // Accept PDF files only
                className="hidden"
            />

            <div
                onClick={handleClick}
                className="my-5 border-2 border-[#ccc] p-5 flex items-center justify-center flex-col w-full h-52 transition ease-in-out hover:border-[#720D96] duration-300 cursor-pointer"
            >
                <div className="bg-[#ccc] rounded-full p-2 mb-3">
                    <BiSolidImageAdd size={30} />
                </div>
                <p>Add PDF Files</p>
            </div>

            <div className="mt-5 flex items-center justify-start gap-4 lg:grid grid-cols-3">
                {selectedFiles.map((fileData, index) => (
                    <div key={fileData.id} className="p-2 border dark:border-hover-dark dark:bg-hover-dark mb-2 relative flex flex-row items-center gap-2 w-[172px] dark:text-primary-light">
                        <img src={folderIcon} alt=""/>
                        <p className="text-sm leading-[17.5px]">{fileData.name.substring(0, 12)}</p>
                        <div onClick={() => handleRemoveFile(index)} className="hover:scale-110">
                            <IoIosClose size={22} color="#ECECEC" cursor={"pointer"} className="hover:scale-110"/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddFiles;
