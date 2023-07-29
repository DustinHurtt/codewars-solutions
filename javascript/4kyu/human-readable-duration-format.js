// Codewars: Human readable duration format
// Link: https://www.codewars.com/kata/52742f58faf5485cae000b9a
// Language: javascript
// Kyu: 4 kyu
function formatDuration (seconds) {
  
  if (!seconds) {
    return 'now'
  }
  
  let preMinutes
  let preHours
  let preDays
    
  let secs = seconds % 60
  let minutes
  let hours
  let days
  let years
  
  if (Math.floor(seconds/60) > 1) {
    preMinutes = Math.floor(seconds/60)
    minutes = preMinutes % 60
  } else {
    minutes = Math.floor(seconds/60)
  }
  
  if (Math.floor(preMinutes/60) > 1) {
    preHours = Math.floor(preMinutes/60) 
    hours = preHours % 24
  } else {
    hours = Math.floor(preMinutes/60)
  }
  
  if (Math.floor(preHours/24) > 1) {
    preDays = Math.floor(preHours/24)
    days = preDays % 365
  } else {
    days = Math.floor(preHours/24)
  }
  
  if (Math.floor(preDays/365) > 1) {
    years = Math.floor(preDays/365)
    
  } else {
    years = Math.floor(preDays/365)
  }
  
  let values = [{years}, {days}, {hours}, {minutes}, {seconds: secs}]
  
  let resolvedValues = []
  
  values.forEach((number) => {
    for (const [key, value] of Object.entries(number)) {
      if (value) {
        if (value === 1) {
          let unit = key.slice(0, -1)
          resolvedValues.push(`${value} ${unit}`)
        } 
        else {       
          resolvedValues.push(`${value} ${key}`)
        }
      }
    }
  })
  
  let finalString = ''

  resolvedValues.forEach((value, i, arr) => {

    if (arr.length > 1 && i === arr.length -1) {
      finalString += 'and '
    }
    finalString += value
    if (arr.length > 1 && i < arr.length -1 && i === arr.length -2) {
      finalString += ' '
    }
    if (arr.length > 1 && i < arr.length -1 && i !== arr.length -2) {
      finalString += ', '
    }
  })

  return finalString
  
}
