export function compatibilityScore(mod) {

  if (!mod)
    return {
      score: 0,
      status: "unknown"
    };

  if (mod.compatible === true)
    return {
      score: 100,
      status: "perfect"
    };

  if (mod.compatible === false)
    return {
      score: 0,
      status: "incompatible"
    };

  return {
    score: 75,
    status: "warning"
  };

}
