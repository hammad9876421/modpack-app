import { getProviders } from "./providerRegistry";

export function selectProvider(preferred) {
  const providers = getProviders();

  if (preferred) {
    const provider = providers.find(
      (item) => item.id === preferred && item.enabled
    );

    if (provider) {
      return provider;
    }
  }

  return providers.find((item) => item.enabled) || null;
}
