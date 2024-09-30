/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import folderIcon from "../../assets/folder-open.svg";
import EditIcon from "../../assets/edit.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddFiles = ({ onFilesChange }) => {
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const maxFilesAllowed = 1;
        const totalFiles = selectedFiles.length + files.length;

        if (totalFiles > maxFilesAllowed) {
            toast.warn(`You can only upload ${maxFilesAllowed} file.`);
            return;
        }

        const filePreviews = files.map((file) => ({
            id: URL.createObjectURL(file),
            file,
            name: file.name,
        }));

        const updatedFiles = [...selectedFiles, ...filePreviews];
        setSelectedFiles(updatedFiles);
        onFilesChange(updatedFiles);

        event.target.value = '';
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
        <div className="w-full">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                multiple
                accept="application/pdf" 
                className="hidden"
            />
            <div className="flex justify-between">
                <div className="flex gap-1 md:text-[18px] leading-[20px] md:leading-[22.5px]">
                    <p>Resume</p>
                    <span className="text-red-500">*</span>
                </div>
                <div>
                    <img
                        src={EditIcon}
                        onClick={handleClick}
                        alt=""
                        className="w-5 md:w-6 transition ease-in-out hover:scale-110 cursor-pointer duration-300"
                    />
                </div>
            </div>

            <div className="mt-5 flex items-center justify-start gap-4 lg:grid grid-cols-3">
                {selectedFiles.map((fileData, index) => (
                    <div
                        key={fileData.id}
                        className="p-2 border dark:border-hover-dark dark:bg-hover-dark mb-2 relative flex flex-row items-center gap-2 w-[172px] dark:text-primary-light"
                    >
                        <img src={folderIcon} alt="" />
                        <p className="text-sm leading-[17.5px]">
                            {fileData.name.substring(0, 12)}
                        </p>
                        <div
                            onClick={() => handleRemoveFile(index)}
                            className="hover:scale-110"
                        >
                            <IoIosClose
                                size={22}
                                color="#ECECEC"
                                cursor={"pointer"}
                                className="hover:scale-110"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddFiles;
