export default function Gallery() {
  return (
    <div className="flex flex-row h-full w-full">
      <img className="w-1/2 object-contain" src="https://picsum.photos/900?1" />

      <img className="w-1/2 object-contain" src="https://picsum.photos/900?2" />
    </div>
  );
}
