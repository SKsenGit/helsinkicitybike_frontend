import React, { useState } from "react"


const Upload = () => {
    const [stationFile, setStationFile] = useState()
    const [journeyFile, setJourneyFile] = useState()

    const fileReader = new FileReader()

    const handleOnChangeStationFile = (e) => {
        setStationFile(e.target.files[0])
    }
    const handleOnChangeJourneyFiles = (e) => {
        setJourneyFile(e.target.files[0])
    }

    const handleOnSubmitStationFile = (e) => {
        e.preventDefault();

        if (stationFile) {
            fileReader.onload = function (event) {
                const csvStations = event.target.result
                csvStationsToArray(csvStations)
            }

            fileReader.readAsText(stationFile)
        }
    }
    const handleOnSubmitJourneyFile = (e) => {
        e.preventDefault();

        if (journeyFile) {
            fileReader.onload = function (event) {
                const csvStations = event.target.result
                csvJourneysToArray(csvStations)
            }

            fileReader.readAsText(journeyFile)
        }
    }
    const csvStationsToArray = (scvText) => {
        const csvRows = scvText.slice(scvText.indexOf("\n") + 1).split("\n")
        let wrongValues = ""
        const stationsArray = csvRows.reduce((result, item) => {
            const itemArray = item.slice(item.indexOf(",") + 1).split(",")
            if (itemArray.length !== 12) {
                wrongValues += item + "\n\n"
                return result
            }
            itemArray[0] = parseInt(itemArray[0])
            itemArray[9] = parseInt(itemArray[9])
            itemArray[10] = parseFloat(itemArray[10])
            itemArray[11] = parseFloat(itemArray[11])
            result.push(itemArray)
            return result
        }, [])
        console.log(stationsArray)
        console.log(wrongValues)
    }

    const csvJourneysToArray = (scvText) => {
        const csvRows = scvText.slice(scvText.indexOf("\n") + 1).split("\n")
        let wrongValues = ""
        const journeysArray = csvRows.reduce((result, item) => {
            const itemArray = item.split(",")
            itemArray[6] = parseInt(itemArray[6])
            itemArray[7] = parseInt(itemArray[7])

            if (itemArray[6] < 10 || itemArray[7] < 10) return result

            if (itemArray.length !== 8) {
                wrongValues += item + "\n\n"
                return result
            }
            itemArray[2] = parseInt(itemArray[2])
            itemArray[4] = parseInt(itemArray[4])
            result.push(itemArray)
            return result
        }, [])
        console.log(journeysArray)
        console.log(wrongValues)
    }
    return (
        <div>
            <h2>Upload</h2>
            <form id="stationsForm">
                <input type="file" id="csvFile" accept=".csv" onChange={handleOnChangeStationFile} /> <br />
                <button onClick={handleOnSubmitStationFile}>Upload stations</button><br /><br /><br />
            </form>
            <form id="journeysForm">
                <input type="file" id="csvFile" accept=".csv" onChange={handleOnChangeJourneyFiles} /><br />
                <button onClick={handleOnSubmitJourneyFile}>Upload journeys</button>
            </form>
        </div>)
}
export default Upload;