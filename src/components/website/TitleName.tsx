interface TitleNameProps {
  title: string;
  type: "blog" | "essay"; // The type could be either "blog" or "essay"
  isLoading: boolean; // New prop to indicate loading state
}

const TitleName: React.FC<TitleNameProps> = ({ title, type, isLoading }) => {
  // Dynamically set the background color based on the type
  const bgColor = type === "blog" ? "bg-yellow-200 text-yellow-600" : "bg-cyan-200 text-cyan-600";

  return (
    <div className="flex flex-row gap-2 items-center text-start my-4 ml-1">
      {/* Title skeleton loader */}
      <h1 className={`text-lg md:text-xl lg:text-2xl ${isLoading ? "bg-gray-300 w-48 h-6 rounded-md animate-pulse" : ""}`}>
        {isLoading ? "" : title}
      </h1>
      
      {/* Type skeleton loader */}
      <div className={`text-sm ${isLoading ? "bg-gray-300 w-24 h-6 rounded-md animate-pulse" : bgColor} px-4 py-1 rounded-xl`}>
        {isLoading ? "" : type ? type.charAt(0).toUpperCase() + type.slice(1) : "loading..."}
      </div>
    </div>
  );
};

export default TitleName;
