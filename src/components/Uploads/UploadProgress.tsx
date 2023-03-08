export function UploadProgress({
  eta,
  elapsed,
}: {
  eta: number;
  elapsed: number;
}) {
  const percent = (elapsed / eta) * 100;

  return (
    <div className="h-6 w-full bg-gray-300 rounded-2xl relative overflow-hidden">
      <div
        className="absolute top-0 bottom-0 left-0 bg-success-500"
        style={{
          width: `${percent}%`,
          transition: ".25s ease",
        }}
      />
    </div>
  );
}
