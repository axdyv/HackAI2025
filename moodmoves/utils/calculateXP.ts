export function calculateXP(wave: number): number {
    if (wave <= 5) {
      return Math.min(2 ** (wave - 1), 16); // 1, 2, 4, 8, 16
    } else if (wave <= 10) {
      return 20;
    } else if (wave <= 15) {
      return 25;
    } else {
      return 25; // XP cap
    }
  }
  