// Codewars: Remove the minimum
// Link: https://www.codewars.com/kata/563cf89eb4747c5fb100001b
// Language: javascript
// Kyu: 7 kyu
function removeSmallest(numbers) {

  let mapped = [...numbers].map((number, i) => {
                              return {rating: number, position: i}
                                })
  let sorted = mapped.sort((a, b) => a.rating - b.rating)

  return [...numbers].filter((element, index) => index !== sorted[0].position)
}