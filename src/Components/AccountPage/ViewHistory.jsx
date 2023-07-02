import { Link } from "react-router-dom"
import { useEffect,useRef } from "react"


export default function ViewHistory({account}) {
    console.log("viewhist", account)
    const watchedList = account?.watchHistory.map((item) => {
        return (
        <div className='movieitem' key={item?._id}>
            <p>{item?.title}</p>
            <Link to={`/movies/${item?.title}`}><img alt='poster' className='poster' src={item?.poster}/></Link>
        </div>
        )
    })

        //----------------------------------
        const scrollableDivRef = useRef(null)
        function handleWheel(event) {
            const scrollableDiv = scrollableDivRef.current
            if (event.target === scrollableDiv || scrollableDiv.contains(event.target)) {
                event.preventDefault(); // Prevent default scrolling behavior
          
                // Adjust the scroll position based on the wheel delta
                scrollableDiv.scrollLeft += event.deltaY;
            }
        }
    
        useEffect(() => {
            const disableScroll = (event) => {
              const scrollableDiv = scrollableDivRef.current;
        
              // Check if the mouse is inside the scrollable div
              if (scrollableDiv.contains(event.target)) {
                event.preventDefault(); // Prevent default scrolling behavior
              }
            };
        
            // Add event listener to window to disable overall scrolling
            window.addEventListener('wheel', disableScroll, { passive: false });
        
            return () => {
              // Clean up the event listener when the component unmounts
              window.removeEventListener('wheel', disableScroll);
            };
          }, []);

          //onWheel={handleWheel} ref={scrollableDivRef}
    //----------------------------

    return (
        <div className="viewhistory">
            <h1>Watch History</h1>
            <div onWheel={handleWheel} ref={scrollableDivRef} className="viewhistorymovies">{watchedList}</div>
        </div>
    )
}