import { SkeletonBox } from "./Skeleton";

export default function ExperimentCardSkeleton() {
  return (
    <li className="bg-gray-800 p-4 rounded-lg shadow">
      <SkeletonBox className="h-5 w-2/3 mb-3" srLabel="Experiment-Name lädt" />
      <SkeletonBox className="h-4 w-32 mb-2" srLabel="Status lädt" />
      <SkeletonBox className="h-4 w-40" srLabel="Erstellungsdatum lädt" />
    </li>
  );
}
