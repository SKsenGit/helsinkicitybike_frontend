import React, { useState } from "react"
import {createStation} from '../services/stations.js'


const Import = () => {
    const [stationFile, setStationFile] = useState()
    const [journeyFile, setJourneyFile] = useState()

    const fileReader = new FileReader()

    const handleOnChangeStationFile = (e) => {
        setStationFile(e.target.files[0])
    }
    const handleOnChangeJourneyFile = (e) => {
        setJourneyFile(e.target.files[0])
    }

    const handleOnSubmitStationFile = (e) => {
        e.preventDefault();

        if (stationFile) {
            fileReader.onload = function (event) {
                const csvStations = event.target.result
                console.log(csvStations)
                importStationArray(csvStations)
            }

            fileReader.readAsText(stationFile)
        }
    }
    const handleOnSubmitJourneyFile = (e) => {
        e.preventDefault();

        if (journeyFile) {
            fileReader.onload = function (event) {
                const csvStations = event.target.result
                importJourneyArray(csvStations)
            }

            fileReader.readAsText(journeyFile)
        }
    }
    const getRowsFromCSV = (scvText) =>{
        const rowsDelimiter = scvText.indexOf("\r\n")>0?"\r\n":"\n"
        const csvRows = scvText.slice(scvText.indexOf("\n") + 1).split(rowsDelimiter)
        return csvRows 
    }

    const importStationArray = (scvText) => {
        const csvRows = getRowsFromCSV(scvText)
        let wrongValues = ""
        const stationsArray = csvRows.reduce((result, item) => {
            const itemArray = item.slice(item.indexOf(",") + 1).split(",")
            if (itemArray.length !== 12) {
                wrongValues += item + "\n\n"
                return result
            }         
            result.push(itemArray)
            return result
        }, [])
        console.log(stationsArray)
        const requestObject = {
            "stations":stationsArray
        }
        createStation(requestObject)
        console.log(wrongValues)
    }

    const importJourneyArray = (scvText) => {
        const csvRows = getRowsFromCSV(scvText)
        let wrongValues = ""
        const journeysArray = csvRows.reduce((result, item) => {
            const itemArray = item.split(",")          

            if (itemArray[6] < 10 || itemArray[7] < 10) return result

            if (itemArray.length !== 8) {
                wrongValues += item + "\n\n"
                return result
            }
            
            result.push([itemArray[0],itemArray[1],itemArray[2],itemArray[4],itemArray[6],itemArray[7]])
            return result
        }, [])
        console.log(journeysArray)
        console.log(wrongValues)
    }
    return (
        <div>
            <h2>Import</h2>
            <form id="stationsForm">
                <input type="file" id="csvFile" accept=".csv" onChange={handleOnChangeStationFile} /> <br />
                <button onClick={handleOnSubmitStationFile}>Upload stations</button><br /><br /><br />
            </form>
            <form id="journeysForm">
                <input type="file" id="csvFile" accept=".csv" onChange={handleOnChangeJourneyFile} /><br />
                <button onClick={handleOnSubmitJourneyFile}>Upload journeys</button>
            </form>
        </div>)
}
export default Import;