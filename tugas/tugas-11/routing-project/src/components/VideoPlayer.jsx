export default function VideoPlayer({ video }) {
  if (!video) return null;

  const videoId = video.id?.videoId || video.id;
  const { title, description, channelTitle } = video.snippet;

  return (
    <>
      <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-lg">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />
      </div>

      <div className="mt-4 border-b pb-3">
        <h1 className="text-2xl font-bold mb-1 text-gray-900">{title}</h1>
        <p className="text-sm text-gray-600">{channelTitle}</p>
      </div>

      <div className="mt-3">
        <p className={"text-sm text-gray-700 whitespace-pre-line "}>
          {description}
        </p>
      </div>
    </>
  );
}
