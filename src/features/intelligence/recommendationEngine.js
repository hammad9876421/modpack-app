import { resolveDependencies } from "./dependencies/dependencyResolver";

export function getRecommendations(modIds = []) {

  const data = resolveDependencies(modIds);

  return {

    installNow: data.required,

    suggested: data.recommended

  };

}
