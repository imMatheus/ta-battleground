import React from "react";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import Editor from "@/components/problems/Editor";
import Link from "next/link";
import classNames from "classnames";
import BouncingBalls from "@/components/loaders/BouncingBalls";

interface ProblemsLayoutProps {
  children: React.ReactNode;
}

const ProblemsLayout: React.FC<ProblemsLayoutProps> = ({ children }) => {
  const router = useRouter();

  const { data: problem, isLoading } = trpc.problem.getById.useQuery({
    id: router.query.id as string,
  });

  if (isLoading)
    return (
      <div className="flex justify-center pt-20">
        <BouncingBalls />
      </div>
    );
  if (!problem) return <p>hmm, error</p>;

  return (
    <div className="grid h-[calc(100vh-56px)] w-screen grid-cols-[1fr_1fr] gap-2 bg-bg-dark">
      <div className="flex h-[calc(100vh-56px)] flex-col">
        <div className="flex flex-shrink-0 bg-bg-dark pt-2 text-sm text-text-dimmed">
          <Link
            href={`/problems/${router.query.id}`}
            className={classNames(
              "rounded-t-md py-2 px-4",
              router.pathname === "/problems/[id]"
                ? "bg-bg-dimmed text-white"
                : "transition-colors hover:bg-bg-dimmed/50"
            )}
          >
            Description
          </Link>
          <Link
            href={`/problems/${router.query.id}/submissions`}
            className={classNames(
              "rounded-t-md py-2 px-4",
              router.pathname === "/problems/[id]/submissions"
                ? "bg-bg-dimmed text-white"
                : "transition-colors hover:bg-bg-dimmed/50"
            )}
          >
            Submissions
          </Link>
          <Link
            href={`/problems/${router.query.id}/leaderboard`}
            className={classNames(
              "rounded-t-md py-2 px-4",
              router.pathname === "/problems/[id]/leaderboard"
                ? "bg-bg-dimmed text-white"
                : "transition-colors hover:bg-bg-dimmed/50"
            )}
          >
            Leaderboard
          </Link>
        </div>
        <div className="flex-1 overflow-scroll bg-bg-dimmed">{children}</div>
      </div>
      {/* <div className="w-4 bg-black"></div> */}
      <div className="flex h-[calc(100vh-56px)] w-full flex-col bg-bg-dimmed">
        <Editor
          problemName={problem.name}
          problemArgs={problem.arguments as string[]}
        />
      </div>
    </div>
  );
};

export default ProblemsLayout;
