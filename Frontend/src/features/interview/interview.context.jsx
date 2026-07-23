import { createContext,useState } from "react";


export const InterviewContext = createContext()

export const InterviewProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState(null)
    const [reports, setReports] = useState([])
    const [selectedFile, setSelectedFile] = useState(null);

    return (
        <InterviewContext.Provider value={{ loading, setLoading, report, setReport, reports, setReports ,selectedFile,setSelectedFile}}>
            {children}
        </InterviewContext.Provider>
    )
}