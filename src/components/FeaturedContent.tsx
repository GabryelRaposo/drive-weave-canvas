
const FeaturedContent = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8 py-6">
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <img 
          src="/lovable-uploads/ff176164-24cb-481d-8c6c-be96b55bff71.png" 
          alt="Comunidade gratuita" 
          className="w-full h-48 object-cover"
        />
        <div className="p-3">
          <h3 className="text-xs font-medium text-gray-500">Comunidade</h3>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="relative pb-[56.25%] h-0">
          <iframe 
            className="absolute top-0 left-0 w-full h-full object-cover"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
            title="Tutorial vídeo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-3">
          <h3 className="text-xs font-medium text-gray-500">Como começar</h3>
        </div>
      </div>
    </div>
  );
};

export default FeaturedContent;
