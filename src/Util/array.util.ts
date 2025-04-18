/**
 *
 * @author 도형
 */
export const getShuffledArray = (array: any[]) => {
  const resultArray = [...array];
  let currentIndex = resultArray.length;
  let randomIndex;

  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [resultArray[currentIndex], resultArray[randomIndex]] = [
      resultArray[randomIndex],
      resultArray[currentIndex],
    ];
  }

  return resultArray;
};
