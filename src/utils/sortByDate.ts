export function sortByDate(data: any) {
  const entries = Object.entries(data)

  entries.sort((a, b) => {
    const dateStringA = a[0]
    const dateStringB = b[0]

    // Handle DD-MM-YYYY format
    const format = /(\d+)-(\d+)-(\d+)/
    const matchA = dateStringA.match(format)
    const matchB = dateStringB.match(format)

    if (matchA && matchB) {
      const yearA = parseInt(matchA[3], 10) // Extract year
      const monthA = parseInt(matchA[2], 10) - 1 // Adjust month for zero-based indexing
      const dayA = parseInt(matchA[1], 10)
      const dateA: any = new Date(yearA, monthA, dayA)

      const yearB = parseInt(matchB[3], 10)
      const monthB = parseInt(matchB[2], 10) - 1
      const dayB = parseInt(matchB[1], 10)
      const dateB: any = new Date(yearB, monthB, dayB)

      return dateA - dateB
    } else {
      console.error('Invalid date format found in keys:', dateStringA, dateStringB)
      // Handle invalid dates (optional: return 0, throw error, etc.)
      return 0 // Assuming you want to keep invalid dates in their original position
    }
  })

  const sortedData = Object.fromEntries(entries)
  return sortedData
}
