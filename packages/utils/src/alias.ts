const flora = ["Willow", "Fern", "Iris", "Sage", "River"];
const stones = ["Light", "Ember", "Sky", "Haven", "Dawn"];

export function generateAlias(seed: number) {
  const plant = flora[seed % flora.length];
  const stone = stones[seed % stones.length];
  return `${plant}-${stone}`.toLowerCase();
}
