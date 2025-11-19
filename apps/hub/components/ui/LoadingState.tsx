type LoadingStateProps = {
  message?: string;
  className?: string;
};

export function LoadingState({
  message = "Loading...",
  className = "",
}: LoadingStateProps) {
  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-8 text-center ${className}`}
    >
      <p className="text-gray-600">{message}</p>
    </div>
  );
}

