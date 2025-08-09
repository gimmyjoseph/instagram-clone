// "use client"
export default async function Stories() {
    let stories = [];
    try {
      const res = await fetch("http://localhost:8080/api/stories", { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      stories = await res.json();
      // Ensure stories is an array
      if (!Array.isArray(stories)) {
        console.error("Stories is not an array:", stories);
        stories = [];
      }
    } catch (error) {
      console.error("Failed to fetch stories:", error);
      stories = [];
    }
  
    return (
      <div className="flex overflow-x-auto mb-6">
        {stories.length > 0 ? (
          stories.map((story) => (
            <div key={story.id} className="text-center mx-2">
              <div className="p-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500">
                <div className="w-[60px] h-[60px] rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                  <span className="text-sm font-semibold text-gray-600">
                    {story.user ? story.user[0] : "?"}
                  </span>
                </div>
              </div>
              <p className="text-sm mt-1">{story.user || "Unknown"}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No stories available</p>
        )}
      </div>
    );
  }
  
  