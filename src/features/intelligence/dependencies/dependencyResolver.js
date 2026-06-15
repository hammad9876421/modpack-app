import { DEPENDENCIES } from "./dependencyDatabase";

export function resolveDependencies(modIds = []) {

  const required = new Set();
  const recommended = new Set();

  modIds.forEach(id => {

    const info = DEPENDENCIES[id];

    if (!info) return;

    info.required.forEach(mod => required.add(mod));

    info.recommended.forEach(mod => recommended.add(mod));

  });

  return {

    required: [...required],

    recommended: [...recommended]

  };

}
