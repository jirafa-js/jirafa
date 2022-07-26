/**
 * Generating a random int in range (min, max - 1)
 *
 * @param min
 * @param max
 */
export const randInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  return Math.floor(Math.random() * (max - min + 1)) + min
}