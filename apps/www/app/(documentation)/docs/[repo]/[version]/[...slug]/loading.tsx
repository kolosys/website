import { SkeletonBar, SkeletonGroup } from "@kolosys-sites/theme";

export default function Loading() {
    return <SkeletonGroup>
        <SkeletonBar className="w-5/6" />
        <SkeletonBar className="w-3/4" />
        <SkeletonBar className="w-4/5" />
        <SkeletonBar className="w-5/6" />
    </SkeletonGroup>
}