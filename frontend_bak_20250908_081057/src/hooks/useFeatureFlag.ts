// src/hooks/useFeatureFlag.ts
export function useFeatureFlagBoolean(key: string, fallback = false) {
  const raw = (import.meta as any).env?.[key];
  if (raw === "true") return true;
  if (raw === "false") return false;
  return fallback;
}
