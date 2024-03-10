
const countDays = (date: Date,previousDate: Date)=>{
    date = new Date(date)
    previousDate = new Date(previousDate)
    const diferenciaMs = Math.abs(date.getTime()-previousDate.getTime());
    const numDias = Math.floor(diferenciaMs/(1000*60*60*24))
    return numDias
}

export default countDays